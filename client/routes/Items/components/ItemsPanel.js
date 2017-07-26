import React from 'react';
import ItemsTable from '../containers/ItemsTable';
import { Modal, ModalHeader, ModalBody } from '../../../components/Modal';
import { NewItemForm } from './ItemForm';

export const ItemsPanel = () => {
    return (
        <div className="col-xs-8 col-xs-offset-2">
            <h2 className="pull-left">Items</h2>
            <div className="pull-right" style={{marginTop: '20px'}}>
                <button className="btn btn-success" data-toggle="modal" data-target="#new-item-modal">
                    <span className="glyphicon glyphicon-plus-sign"></span>&nbsp;New Item
                </button>
            </div>
            <ItemsTable />
            <Modal id="new-item-modal" size="modal-sm">
                <ModalHeader>
                    <span className="close" data-dismiss="modal">&times;</span>
                    <h4>New Item</h4>
                </ModalHeader>
                <ModalBody>
                    <NewItemForm />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ItemsPanel;
