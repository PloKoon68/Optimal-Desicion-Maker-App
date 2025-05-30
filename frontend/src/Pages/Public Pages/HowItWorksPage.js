const HowItWorksPage = () => {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4 display-4">🎓 How It Works</h1>

      <div className="mb-5">
        <p className="lead">
          The Optimal Decision Maker App helps you evaluate and rank alternatives based on multiple criteria using proven decision-making techniques. Here’s a step-by-step overview of how the app works.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="h4">1. Create a Case 📁</h2>
        <p>
          Start by creating a new "case", which will represent a decision problem you're trying to solve (e.g., choosing a laptop, hiring a candidate, selecting a project).
        </p>
      </div>

      <div className="mb-4">
        <h2 className="h4">2. Define Criteria 🎯</h2>
        <p>
          Add the criteria that matter in your decision — such as cost, performance, reliability, etc. You can also specify whether a criterion should be maximized (benefit) or minimized (cost).
        </p>
      </div>

      <div className="mb-4">
        <h2 className="h4">3. Add Alternatives 🧩</h2>
        <p>
          Provide the different options you're considering (e.g., Laptop A, Laptop B...). For each alternative, you’ll assign values for each criterion.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="h4">4. Input the Decision Matrix 🧮</h2>
        <p>
          Fill in the matrix by assigning a value to each alternative for each criterion. This is where you quantify how each alternative performs.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="h4">5. Assign Weights ⚖️</h2>
        <p>
          Not all criteria are equally important. Assign weights to indicate the relative importance of each criterion.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="h4">6. Process & See Results 📊</h2>
        <p>
          The app processes your inputs using MCDM methods like Weighted Sum Model (WSM), TOPSIS, etc., and displays the ranked results clearly.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="h4">7. Interpret & Decide ✔️</h2>
        <p>
          Use the ranked results and visualizations to understand the best option according to your priorities.
        </p>
      </div>

      <div className="mb-4">
        <h2 className="h4">🎥 Need Help?</h2>
        <p>
          A step-by-step video tutorial will be available soon to walk you through the full process visually.
        </p>
      </div>

      <div>
        <h2 className="h4">🙌 You're in Control</h2>
        <p>
          Whether you're a student, professional, or decision enthusiast — this tool empowers you to make smarter, more confident decisions.
        </p>
      </div>
    </div>
  );
};

export default HowItWorksPage;
