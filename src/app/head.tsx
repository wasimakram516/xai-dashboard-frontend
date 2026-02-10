export default function Head() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return (
    <>
      <title>GlassLearn</title>

      <meta
        name="description"
        content="An educator-oriented decision-support dashboard integrating machine learning and Explainable AI (XAI) to predict and interpret student performance using the Open University Learning Analytics Dataset (OULAD)."
      />

      <meta
        name="keywords"
        content="Explainable AI, XAI in Education, Learning Analytics, Student Performance Prediction, OULAD, XGBoost, SHAP, Adaptive Learning Systems"
      />

      <meta name="author" content="Wasim Akram" />
      <meta name="application-name" content="GlassLearn" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="GlassLearn" />
      <meta
        property="og:description"
        content="Explainable AI-powered dashboard for predicting and interpreting student academic performance using OULAD."
      />
      <meta property="og:site_name" content="GlassLearn" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:image" content={`${baseUrl}/og-image.png`} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="GlassLearn" />
      <meta
        name="twitter:description"
        content="Explainable AI dashboard for adaptive learning and early risk prediction in education."
      />
      <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />

      {/* Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </>
  );
}
