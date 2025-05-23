import './ScoreTable.css';

export default function ScoreTable({ results }) {
    return (
        <div className="score-table">
            <div className="wrapper" id='score-table'>
                <table style={{ width: "100%" }}>
                    <caption>Scores</caption>

                    <thead>
                        <tr>
                            <th>Alternative</th>
                            <th>Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            results.labels.map((label, index) => (
                                <tr key={index}>
                                    <td>{label}</td>
                                    <td>{results.scores[index]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
