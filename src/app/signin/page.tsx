"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    const res = await signIn("credentials", { email, redirect: false, callbackUrl: "/" });
    if (res?.ok) setStatus("Signed in successfully. You can save your favourites on this device during this session.");
    else setStatus("Could not sign in. Please check your email and try again.");
  };

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: "url(/images/repo/repo-19.jpg)" }}>
        <div className="container">
          <h1>Sign In</h1>
          <p>Light sign in for saving favourites or class interests.</p>
        </div>
      </div>
      <div className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ margin: "0 auto", float: "none" }}>
              <div className="sc-card">
                <div className="sc-card-body">
                  <h3>Welcome back</h3>
                  <p>Sign in with your email to keep a simple list of favourites or class interests.</p>
                  <form className="sc-form" onSubmit={handleSubmit}>
                    <div className="form-box">
                      <label htmlFor="signin-email">Email</label>
                      <input id="signin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-primary-sc" style={{ width: "100%" }}>Sign in</button>
                    {status && <p role="status" style={{ marginTop: 12 }}>{status}</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
