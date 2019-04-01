import React, { Component } from 'react';
import fs from 'fs';
import UIPredicateCoreReact from './UIPredicateCoreReact';
import { InitializationFailed } from './errors';
import UIPredicateCompound from './ui-predicate-compound';
import './ui-predicate-react.css';

const css = fs.readFileSync(`${__dirname}/ui-predicate-react.css`, 'utf8');
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

class UIPredicate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCoreReady: false,
    };
    this.getAddCompoundMode = this.getAddCompoundMode.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.setPredicateLogicalType_id = this.setPredicateLogicalType_id.bind(
      this
    );
    this.setPredicateTarget_id = this.setPredicateTarget_id.bind(this);
    this.setPredicateOperator_id = this.setPredicateOperator_id.bind(this);
    this.getArgumentTypeComponentById = this.getArgumentTypeComponentById.bind(
      this
    );
    this.setArgumentValue = this.setArgumentValue.bind(this);
    this.getUIComponent = this.getUIComponent.bind(this);
    this.handleInitialized = this.handleInitialized.bind(this);
    this.onAltPressed = this.onAltPressed.bind(this);
    this.onAltReleased = this.onAltReleased.bind(this);
    this.triggerChanged = this.triggerChanged.bind(this);
    this.setIsInAddCompoundMode = this.setIsInAddCompoundMode.bind(this);
    this.getController = this.getController.bind(this);
  }

  onAltPressed(event) {
    // If alt was pressed...
    if (event.keyCode === 18) this.setIsInAddCompoundMode(true);
  }
  onAltReleased(event) {
    // If alt was released...
    if (event.keyCode === 18) this.setIsInAddCompoundMode(false);
  }
  handleInitialized() {
    if (this.props.onInitialized) this.props.onInitialized(this.state.ctrl);
    if (this.props.refs) this.props.refs(this);
  }

  getController() {
    return this.state.ctrl;
  }

  getAddCompoundMode() {
    return this.state.isInAddCompoundMode;
  }
  setIsInAddCompoundMode(isInAddCompoundMode) {
    this.setState({ isInAddCompoundMode });
    if (this.props.onAddCompoundModeChange)
      this.props.onAddCompoundModeChange(isInAddCompoundMode);
  }

  triggerChanged() {
    // update the state with the new root
    this.setState({
      root: this.state.ctrl.root,
    });
    // callback onChanged when some predicates where changed
    if (this.props.onChange) this.props.onChange(this.state.ctrl.toJSON());
  }

  add(predicate) {
    return this.state.ctrl.add({
      where: predicate,
      how: 'after',
      type: this.state.isInAddCompoundMode
        ? 'CompoundPredicate'
        : 'ComparisonPredicate',
    });
  }
  remove(predicate) {
    return this.state.ctrl.remove(predicate);
  }
  setPredicateLogicalType_id(predicate, logicalType_id) {
    return this.state.ctrl.setPredicateLogicalType_id(
      predicate,
      logicalType_id
    );
  }
  setPredicateTarget_id(predicate, target_id) {
    return this.state.ctrl.setPredicateTarget_id(predicate, target_id);
  }
  setPredicateOperator_id(predicate, operator_id) {
    return this.state.ctrl.setPredicateOperator_id(predicate, operator_id);
  }
  getArgumentTypeComponentById(argumentType_id) {
    return this.state.ctrl.getArgumentTypeComponentById(argumentType_id);
  }
  setArgumentValue(predicate, value) {
    return this.state.ctrl.setArgumentValue(predicate, value);
  }
  getUIComponent(name) {
    return this.state.ctrl.getUIComponent(name);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onAltReleased);
    window.addEventListener('keydown', this.onAltPressed);

    UIPredicateCoreReact({
      data: this.props.data,
      columns: this.props.columns,
      ui: this.props.ui,
    }).then(
      ctrl => {
        // Listen for changes
        ctrl.on('changed', this.triggerChanged);
        // Set current state to indicate we're ready
        this.setState(
          {
            ctrl,
            root: ctrl.root,
            isCoreReady: true,
          },
          this.handleInitialized
        );
      },
      err => {
        const initializationFailedError = Object.assign(
          new InitializationFailed(),
          { cause: err }
        );
        throw initializationFailedError;
      }
    );
  }
  componentWillUnmount() {
    if (this.state.ctrl) this.state.ctrl.off();
    window.removeEventListener('keyup', this.onAltReleased);
    window.removeEventListener('keydown', this.onAltPressed);
  }

  render() {
    const { isCoreReady, root } = this.state;
    const { columns, className } = this.props;
    return (
      <div className={`ui-predicate__main ${className}`}>
        {!isCoreReady && Boolean(this.props.loader) && this.props.loader}
        {Boolean(isCoreReady) && (
          <UIPredicateCompound
            predicate={root}
            columns={columns}
            getAddCompoundMode={this.getAddCompoundMode}
            add={this.add}
            remove={this.remove}
            setPredicateLogicalType_id={this.setPredicateLogicalType_id}
            setPredicateTarget_id={this.setPredicateTarget_id}
            setPredicateOperator_id={this.setPredicateOperator_id}
            getArgumentTypeComponentById={this.getArgumentTypeComponentById}
            setArgumentValue={this.setArgumentValue}
            getUIComponent={this.getUIComponent}
          />
        )}
      </div>
    );
  }
}

export default UIPredicate;
