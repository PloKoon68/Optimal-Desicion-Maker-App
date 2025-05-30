const AboutPage = () => {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4 display-4">🧠 Optimal Decision Maker App</h1>

      <div className="mb-4">
        <p className="lead">
          Welcome to the Optimal Decision Maker App! In today’s complex world, making the right decision can be overwhelming — especially when you're dealing with multiple options and trade-offs. This app is here to help.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="h4">🎯 What is this app?</h2>
        <p>
          The Optimal Decision Maker App is an intelligent, easy-to-use tool that helps you make better decisions using proven Multi-Criteria Decision-Making (MCDM) methods.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="h4">💡 Why use it?</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Structure complex decisions with multiple criteria</li>
          <li className="list-group-item">Compare alternatives in a transparent way</li>
          <li className="list-group-item">Visualize decision matrices and results</li>
          <li className="list-group-item">Save and revisit your decision cases</li>
          <li className="list-group-item">Reduce bias and uncertainty in decision-making</li>
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="h4">👥 Who is it for?</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Business analysts & project managers</li>
          <li className="list-group-item">Students & researchers in decision sciences</li>
          <li className="list-group-item">Professionals evaluating options</li>
          <li className="list-group-item">Anyone who wants to make smarter choices</li>
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="h4">🔧 What's under the hood?</h2>
        <p>
          The app uses established decision-making methods like:
        </p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Weighted Sum Model (WSM)</li>
          <li className="list-group-item">TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)</li>
          <li className="list-group-item">And more to come...</li>
        </ul>
      </div>

      <div>
        <h2 className="h4">🚀 Let’s Make Decisions Smarter</h2>
        <p>
          No more spreadsheets. No more guesswork. Just clarity.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
