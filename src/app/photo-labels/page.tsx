"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { productNames } from "@/lib/products";

const photoFiles = Array.from({ length: 52 }, (_, index) =>
  `repo-${String(index + 1).padStart(2, "0")}.jpg`,
);
const sessionKey = "super-chris-photo-label-admin";
const skipValue = "__skip__";

type Filter = "all" | "unlabeled" | "labeled" | "skip";

async function fetchSavedLabels() {
  const response = await fetch("/api/photo-labels", { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load shared labels.");
  const data = (await response.json()) as { labels?: Record<string, string>; editingOpen?: boolean };
  return { labels: data.labels || {}, editingOpen: data.editingOpen === true };
}

export default function PhotoLabelsPage() {
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [editingOpen, setEditingOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Loading saved labels...");
  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const saveVersions = useRef<Record<string, number>>({});

  useEffect(() => {
    let active = true;
    const savedToken = window.sessionStorage.getItem(sessionKey) || "";
    if (savedToken) {
      setAdminToken(savedToken);
      fetch("/api/photo-labels", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${savedToken}` },
        body: JSON.stringify({ action: "verify" }),
      }).then((response) => {
        if (!active) return;
        if (response.ok) setIsUnlocked(true);
        else window.sessionStorage.removeItem(sessionKey);
      }).catch(() => undefined);
    }
    fetchSavedLabels().then((saved) => {
      if (!active) return;
      setLabels(saved.labels);
      if (saved.editingOpen) {
        setEditingOpen(true);
        setIsUnlocked(true);
        setSaveStatus("Open for labeling. Changes save to the shared menu.");
      }
      setIsLoaded(true);
      if (!saved.editingOpen) setSaveStatus("Connected to shared labels");
    }).catch(() => {
      if (!active) return;
      setIsLoaded(true);
      setSaveStatus("Could not connect to shared labels. Refresh to retry.");
    });
    return () => { active = false; };
  }, []);

  useEffect(() => () => {
    Object.values(saveTimers.current).forEach(clearTimeout);
  }, []);

  const reviewedCount = photoFiles.filter((file) => {
    const value = labels[file] || "";
    return value === skipValue || value !== "";
  }).length;

  const visiblePhotos = useMemo(() => {
    const query = search.trim().toLowerCase();
    return photoFiles.filter((file) => {
      const value = labels[file] || "";
      const isReviewed = value === skipValue || value !== "";
      const statusMatches =
        filter === "all" ||
        (filter === "unlabeled" && !isReviewed) ||
        (filter === "labeled" && isReviewed && value !== skipValue) ||
        (filter === "skip" && value === skipValue);
      return statusMatches && (!query || `${file} ${value}`.toLowerCase().includes(query));
    });
  }, [filter, labels, search]);

  async function unlockEditing(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveStatus("Checking access...");
    try {
      const response = await fetch("/api/photo-labels", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ action: "verify" }),
      });
      if (!response.ok) throw new Error("That access token was not accepted.");
      window.sessionStorage.setItem(sessionKey, adminToken);
      setIsUnlocked(true);
      setSaveStatus("Editing unlocked. Changes save to the live menu.");
    } catch {
      setSaveStatus("Access token not accepted. Please check it and try again.");
    }
  }

  function saveLabel(file: string, value: string) {
    if (!isUnlocked) return;
    const version = (saveVersions.current[file] || 0) + 1;
    saveVersions.current[file] = version;
    setSaveStatus("Saving your latest change...");
    if (saveTimers.current[file]) clearTimeout(saveTimers.current[file]);

    saveTimers.current[file] = setTimeout(async () => {
      const body = value === skipValue
        ? { filename: file, skip: true }
        : { filename: file, label: value, skip: false };
      try {
        const response = await fetch("/api/photo-labels", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error("Save failed");
        if (saveVersions.current[file] === version) setSaveStatus("Saved to the shared menu catalog");
      } catch {
        if (saveVersions.current[file] === version) setSaveStatus("Save failed. Check the connection and try again.");
      }
    }, 350);
  }

  function updateLabel(file: string, value: string) {
    setLabels((current) => ({ ...current, [file]: value }));
    saveLabel(file, value);
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Label Our Photos</h1>
          <p>
            See each photo beside its label. Click a suggested product name or type the exact name
            if it is not listed. Labels save automatically to the shared menu.
          </p>
        </div>
      </div>

      <section className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="photo-label-toolbar">
            <div>
              <strong>{reviewedCount} of {photoFiles.length} photos reviewed</strong>
              <p aria-live="polite">{isLoaded ? saveStatus : "Loading saved labels..."}</p>
            </div>
            {editingOpen ? (
              <div className="photo-label-access" role="status">
                <strong>Editing is open</strong>
                <span>You can label each photo now. Changes save automatically.</span>
              </div>
            ) : (
              <form className="photo-label-access" onSubmit={unlockEditing}>
                <label htmlFor="photo-label-token">Owner access token</label>
                <div>
                  <input
                    id="photo-label-token"
                    type="password"
                    autoComplete="current-password"
                    value={adminToken}
                    onChange={(event) => setAdminToken(event.target.value)}
                    placeholder={isUnlocked ? "Editing unlocked" : "Enter owner token to edit"}
                    disabled={isUnlocked || !isLoaded}
                  />
                  <button className="btn-primary-sc" type="submit" disabled={isUnlocked || !isLoaded || !adminToken}>
                    {isUnlocked ? "Unlocked" : "Unlock editing"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="photo-label-controls">
            <label>
              <span>Find a photo or selected label</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search repo-01 or a product name"
              />
            </label>
            <label>
              <span>Show</span>
              <select value={filter} onChange={(event) => setFilter(event.target.value as Filter)}>
                <option value="all">All photos</option>
                <option value="unlabeled">Needs a label</option>
                <option value="labeled">Labeled items</option>
                <option value="skip">Marked not for menu</option>
              </select>
            </label>
          </div>

          <datalist id="photo-label-product-suggestions">
            {productNames.map((item) => <option key={item.name} value={item.name} />)}
          </datalist>
          <div className="photo-label-grid">
            {visiblePhotos.map((file) => {
              const current = labels[file] || "";
              const isSkipped = current === skipValue;
              return (
                <article className="photo-label-card" key={file}>
                  <div className="photo-label-image">
                    <Image
                      src={`/images/repo/${file}`}
                      alt={`Uploaded bakery photo ${file}`}
                      fill
                      sizes="(max-width: 600px) 42vw, (max-width: 1000px) 24vw, 18vw"
                    />
                  </div>
                  <div className="photo-label-card-body">
                    <h2>{file}</h2>
                    <label className="photo-label-entry">
                      <span>Item shown (click a suggestion or type a label)</span>
                      <input
                        type="text"
                        list="photo-label-product-suggestions"
                        maxLength={120}
                        autoComplete="off"
                        value={isSkipped ? "" : current}
                        disabled={!isUnlocked || !isLoaded}
                        onChange={(event) => updateLabel(file, event.target.value)}
                        placeholder="Search or enter exact name"
                      />
                    </label>
                    {isSkipped ? (
                      <p className="photo-label-current">Marked not for the menu.</p>
                    ) : current ? (
                      <p className="photo-label-current">Saved label: <strong>{current}</strong></p>
                    ) : (
                      <p className="photo-label-current">No label saved yet.</p>
                    )}
                    <div className="photo-label-card-actions">
                      <button
                        type="button"
                        className={isSkipped ? "photo-label-action is-selected" : "photo-label-action"}
                        disabled={!isUnlocked || !isLoaded}
                        onClick={() => updateLabel(file, isSkipped ? "" : skipValue)}
                      >
                        {isSkipped ? "Undo skip" : "Not a menu item"}
                      </button>
                      {current && !isSkipped ? (
                        <button
                          type="button"
                          className="photo-label-action"
                          disabled={!isUnlocked || !isLoaded}
                          onClick={() => updateLabel(file, "")}
                        >
                          Clear label
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
            {visiblePhotos.length === 0 ? <p>No photos match this filter.</p> : null}
          </div>
        </div>
      </section>
    </>
  );
}
