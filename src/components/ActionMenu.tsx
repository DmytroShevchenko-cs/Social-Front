import React from 'react';

const ActionMenu = ({ onDelete, onBlock }: { onDelete: () => void; onBlock: () => void; }) => {
    return (
        <div className="action-menu">
            <button onClick={onDelete}><label htmlFor="">Remove friend</label></button>
            <button onClick={onBlock}><label htmlFor="">Block</label></button>
        </div>
    );
};

export default ActionMenu;
