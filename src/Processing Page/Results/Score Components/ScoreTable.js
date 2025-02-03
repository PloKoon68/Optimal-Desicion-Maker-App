import './ScoreTable.css';

export default function ScoreTable({results}) {

    return (
        <div className="">
            <div class="wrapper" id='score-table'>
                <table style={{width: "100%"}}>
                    <caption>Scores</caption>
                    
                    <tr>
                        <th>Alternative</th>
                        <th>Score</th>
                    </tr>
                    {
                        results.labels.map((label, index) => (
                            <tr>
                                <td>{label}</td>
                                <td>{results.scores[index]}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    )
}
        