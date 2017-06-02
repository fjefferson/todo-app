import React, {Component} from 'react';
import If from '../component/if';

export default class Modal extends Component {
    render(){
        return (
            <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">{this.props.title || 'Attention'}</h4>
                    </div>
                    <div className="modal-body">
                        {this.props.description}
                    </div>
                    <div className="modal-footer">
                        <If test={this.props.confirmation}>
                            <span>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.handleConfirm}>{this.props.confirmButton || 'Yes'}</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">{this.props.cancelButton || 'Cancel'}</button>
                            </span>
                        </If>
                        <If test={!this.props.confirmation}>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.handleComplete}>{this.props.okButton || 'Ok'}</button>
                        </If>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}