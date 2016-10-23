import React, { Component } from 'react';
import _                    from 'underscore';

class TinyWrap extends Component {
    constructor(props) {
        super(props);

        this.state = {editorInstance: 'tinymce_editor_' + this.generateUniqueID()};
    }

    generateUniqueID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };

    shouldComponentUpdate() {return false;}

    getInstance() {
        if (tinymce.get(this.state.editorInstance) && tinymce.get(this.state.editorInstance).initialized)
            return tinymce.get(this.state.editorInstance);

        return false;
    }

    componentWillReceiveProps(props) {
        var tinywrap = this;

        if (tinymce.get(this.state.editorInstance) && tinymce.get(this.state.editorInstance).initialized) {
            if (tinymce.get(tinywrap.state.editorInstance).getContent() != props.content)
                tinymce.get(this.state.editorInstance).setContent((props.content) ? props.content : '');
        } else {
            if (this.delayedUpdate)
                clearInterval(this.delayedUpdate);

            this.delayedUpdate = setInterval(function(){
                if (tinymce.get(tinywrap.state.editorInstance) && tinymce.get(tinywrap.state.editorInstance).initialized) {
                    if (tinymce.get(tinywrap.state.editorInstance).getContent() != props.content)
                        tinymce.get(tinywrap.state.editorInstance).setContent((props.content) ? props.content : '');

                    clearInterval(tinywrap.delayedUpdate);
                }
            }, 100);
        }
    }

    componentDidMount() {
        var tinywrap = this;

        tinymce.init({
            ...this.props.config,
            selector: '#' + this.state.editorInstance,
            init_instance_callback: function(ed) {
            ed.setContent((tinywrap.props.content) ? tinywrap.props.content : '');

            var events = ['NodeChange', 'change', 'keyup', 'undo', 'redo', 'cut', 'copy', 'paste'];

            _.forEach(events, function(e){
                ed.on(e, function(){
                    if (tinywrap.props.onChange && typeof tinywrap.props.onChange == 'function')
                        tinywrap.props.onChange(tinymce.get(tinywrap.state.editorInstance).getContent());
                });
            });
        }}
    );
    }

    componentWillUnmount() {
        if (tinymce.get(this.state.editorInstance))
            tinymce.get(this.state.editorInstance).destroy();
    }


    render() {
        return (
            <textearea id={this.state.editorInstance} />
    );
    }
}

export default TinyWrap;