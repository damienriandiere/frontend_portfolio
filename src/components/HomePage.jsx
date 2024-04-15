function HomePage() {
  return (
    <div>
        <h1>Bienvenue sur mon Portfolio</h1>
        <p>Je suis Damien Riandiere, un développeur passionné par l&apos;intelligence artificielle et la création de solutions innovantes.</p>

      {/* Section Compétences */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Compétences</h2>
        <ul className="list-disc list-inside">
          <li>Front-end : HTML, CSS, JavaScript, React.js</li>
          <li>Back-end : Node.js, Express.js, MongoDB</li>
          <li>Outils : Git, Webpack, Babel</li>
        </ul>
      </section>
    </div>
  );
}

export default HomePage;