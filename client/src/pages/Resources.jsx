import { useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ResourceCard from "../components/ResourceCard.jsx";
import { resources } from "../data/content.js";

const defaultGallery = [
  "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=900&q=80"
];

export default function Resources() {
  const [gallery, setGallery] = useState(defaultGallery);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortMode, setSortMode] = useState("recommended");
  const [previewResource, setPreviewResource] = useState(null);
  const [moodFilter, setMoodFilter] = useState("All");

  const handleGalleryChange = (index, value) => {
    setGallery((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const filteredResources = useMemo(() => {
    let list = [...resources];

    if (categoryFilter !== "All") {
      list = list.filter((item) => item.type === categoryFilter);
    }

    if (moodFilter !== "All") {
      list = list.filter((item) => item.moods?.includes(moodFilter));
    }

    if (sortMode === "downloads") {
      list.sort((a, b) => Number(b.mostDownloaded) - Number(a.mostDownloaded));
    } else if (sortMode === "exam-stress") {
      list.sort((a, b) => Number(b.examStressRecommended) - Number(a.examStressRecommended));
    } else {
      list.sort((a, b) => Number(b.examStressRecommended) - Number(a.examStressRecommended));
    }

    return list;
  }, [categoryFilter, sortMode, moodFilter]);

  return (
    <div className="app">
      <Header />
      <main>
        <section className="hero sub-hero">
          <div className="hero-copy">
            <p className="eyebrow">Resources</p>
            <h1>Practical Tools for Everyday Mental Wellness</h1>
            <p className="lead">
              Download guided journals, calming resources, and structured routines to support your daily emotional balance.
            </p>
          </div>
          
          <div className="hero-card hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1542353436-312f0e1f67ff?q=80&w=1542&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Relaxed breathing practice"
            />
          
          </div>
        </section>

        <section className="section">
          <SectionHeader
            title="Downloadable Resources"
            subtitle="Use these tools for practical daily support."
          />
          <div className="resource-controls">
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="All">All Categories</option>
              <option value="Guide">Guide</option>
              <option value="Journal">Journal</option>
              <option value="Routine">Routine</option>
            </select>

            <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
              <option value="recommended">Recommended First</option>
              <option value="downloads">Most Downloaded</option>
              <option value="exam-stress">Recommended for Exam Stress</option>
            </select>

            <select value={moodFilter} onChange={(event) => setMoodFilter(event.target.value)}>
              <option value="All">All Moods</option>
              <option value="overwhelmed">Overwhelmed</option>
              <option value="anxious">Anxious</option>
              <option value="stressed">Stressed</option>
              <option value="exam-stress">Exam Stress</option>
              <option value="low-energy">Low Energy</option>
            </select>
          </div>
          <div className="grid three">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                {...resource}
                onPreview={() => setPreviewResource(resource)}
              />
            ))}
          </div>
        </section>

        <section className="section alt">
          <SectionHeader
            title="Resource Gallery"
            subtitle="Visual blocks linked to your custom image slots."
          />
          <div className="grid three">
            {gallery.map((image, index) => (
              <article className="card gallery-card" key={index}>
                <img src={image} alt={`Resource gallery ${index + 1}`} />
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      {previewResource ? (
        <div className="focus-overlay" role="dialog" aria-modal="true" aria-label="Resource preview">
          <div className="focus-shell">
            <button className="focus-close" onClick={() => setPreviewResource(null)}>
              Close
            </button>
            <p className="focus-tag">Preview</p>
            <h2>{previewResource.title}</h2>
            <p className="muted">{previewResource.body}</p>
            <div className="resource-meta">
              <p>{previewResource.fileLabel}</p>
              <p>{previewResource.estimate}</p>
            </div>
            <a className="primary" href={previewResource.downloadUrl} download>
              Download Resource
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
