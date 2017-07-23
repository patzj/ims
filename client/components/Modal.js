import React from 'react';

export const Modal = ({id, children}) => {
    return (
        <div id={id} className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const ModalHeader = ({children}) => {
    return (
        <div className="modal-header">
            {children}
        </div>
    );
};

export const ModalBody = ({children}) => {
    return (
        <div className="modal-body">
            {children}
        </div>
    );
};

export const ModalFooter = ({children}) => {
    return (
        <div className="modal-footer">
            {children}
        </div>
    );
};
