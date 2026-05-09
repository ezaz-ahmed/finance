function ConfirmDialog({ description, onConfirm, onCancel }) {
  return (
    <div className='dialog-overlay' onClick={onCancel}>
      <div className='dialog-card' onClick={(e) => e.stopPropagation()}>
        <div className='dialog-icon'>
          <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='#fb7185' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='3 6 5 6 21 6' />
            <path d='M19 6l-1 14H6L5 6' />
            <path d='M10 11v6M14 11v6' />
            <path d='M9 6V4h6v2' />
          </svg>
        </div>
        <h3 className='dialog-title'>Delete Transaction</h3>
        <p className='dialog-body'>
          Remove <span className='dialog-highlight'>{description}</span>? This cannot be undone.
        </p>
        <div className='dialog-actions'>
          <button className='dialog-cancel' onClick={onCancel}>Cancel</button>
          <button className='dialog-confirm' onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;