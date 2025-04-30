export default function TransactionList({ transactions, onDelete }) {
    return (
      <ul>
        {transactions.map((txn) => (
          <li key={txn._id}>
            {txn.description} - ₹{txn.amount} ({new Date(txn.date).toLocaleDateString()})
            <button onClick={() => onDelete(txn._id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
  