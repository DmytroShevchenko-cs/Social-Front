import React from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';

const ActionMenu = ({ onDelete, onBlock }: { onDelete: () => void; onBlock: () => void; }) => {
    const {t} = useTranslation();
    const removeLabel = t('friends.action.remove');
    const blockLabel = t('friends.action.block');
    return (
        <div className="action-menu">
            <button onClick={onDelete}><label htmlFor="">{removeLabel}</label></button>
            <button onClick={onBlock}><label htmlFor="">{blockLabel}</label></button>
        </div>
    );
};

export default ActionMenu;
