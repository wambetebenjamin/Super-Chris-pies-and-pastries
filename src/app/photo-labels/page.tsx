"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { productNames } from "@/lib/products";

const photoFiles = Array.from({ length: 52 }, (_, index) =>
  `repo-${String(index + 1).padStart(2, "0")}.jpg`,
);
const storageKey = "super-chris-photo-labels-v1";
const skipValue = "__skip__";
const customValue = "__custom__";

type Filter = "all" | "unlabeled" | "labeled" | "skip";

export default function PhotoLabelsPage() {
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setLabels(JSON.parse(saved) as Record<string, string>);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(labels));
  }, [hydrated, labels]);

  const labeledCount = photoFiles.filter((file) => Boolean(labels[file])).length;
  const visiblePhotos = useMemo(() => {
    const query = search.trim().toLowerCase();
    return photoFiles.filter((file) => {
      const value = labels[file] || "";
      const statusMatches =
        filter === "all" ||
        (filter === "unlabeled" && !value) ||
        (filter === "labeled" && Boolean(value) && value !== skipValue) ||
        (filter === "skip" && value === skipValue);
      const labelText = value.startsWith("custom:") ? value.slice(7) : value;
      return statusMatches && (!query || `${file} ${labelText}`.toLowerCase().includes(query));
    });
  }, [filter, labels, search]);

  function setLabel(file: string, value: string) {
    setLabels((current) => ({ ...current, [file]: value }));
  }

  function exportLabels() {
    const exportData = photoFiles.map((file) => {
      const value = labels[file] || "";
      return {
        filename: file,
        label: value.startsWith("custom:") ? value.slice(7) : value || null,
        status: value === skipValue ? "skip" : value ? "labeled" : "unlabeled",
      };
    });
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "super-chris-photo-labels.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function clearLabels() {
    if (!window.confirm("Clear all photo labels saved in this browser?")) return;
    setLabels({});
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Label Our Photos</h1>
          <p>
            Choose the exact menu item shown in each repository photo. If it does not match
            any listed product, mark it as not for the menu or enter its exact name.
          </p>
        </div>
      </div>

      <section className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="photo-label-toolbar">
            <div>
              <strong>{labeledCount} of {photoFiles.length} photos reviewed</strong>
              <p>Selections save in this browser. Export the JSON when finished and share it back here.</p>
            </div>
            <div className="photo-label-actions">
              <button className="btn-primary-sc" type="button" onClick={exportLabels}>
                Download labels
              </button>
              <button className="btn-outline-sc" type="button" onClick={clearLabels}>
                Clear labels
              </button>
            </div>
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

          <div className="photo-label-grid">
            {visiblePhotos.map((file) => {
              const current = labels[file] || "";
              const selectedItem = current.startsWith("custom:") ? customValue : current;
              const customText = current.startsWith("custom:") ? current.slice(7) : "";
              return (
                <article className="photo-label-card" key={file}>
                  <div className="photo-label-image">
                    <Image
                      src={`/images/repo/${file}`}
                      alt={`Uploaded bakery photo ${file}`}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                    />
                  </div>
                  <div className="photo-label-card-body">
                    <h2>{file}</h2>
                    <label className="photo-label-select">
                      <span>What is shown in this photo?</span>
                      <select
                        value={selectedItem}
                        onChange={(event) => {
                          const value = event.target.value;
                          setLabel(file, value === customValue ? "custom:" : value);
                        }}
                      >
                        <option value="">Choose the exact item</option>
                        {productNames.map((item) => (
                          <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                        <option value={customValue}>Other food, enter exact name</option>
                        <option value={skipValue}>Not a menu item / do not use</option>
                      </select>
                    </label>
                    {selectedItem === customValue ? (
                      <label className="photo-label-custom">
                        <span>Exact food name</span>
                        <input
                          type="text"
                          value={customText}
                          onChange={(event) => setLabel(file, `custom:${event.target.value}`)}
                          placeholder="Type the exact name"
                        />
                      </label>
                    ) : null}
                    {current && current !== skipValue ? (
                      <p className="photo-label-current">
                        Label: <strong>{current.startsWith("custom:") ? customText || "Enter a name" : current}</strong>
                      </p>
                    ) : null}
                    {current === skipValue ? (
                      <p className="photo-label-current">This photo will not be used for a menu item.</p>
                    ) : null}
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
