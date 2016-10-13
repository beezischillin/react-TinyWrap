import React, { Component } from 'react';
import moment               from 'moment';

class TinyWrap extends Component {
    constructor(props) {
        super(props);

        this.state = {editorInstance: 'tinymce_editor_' + moment().format('X')};
    }

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

            ed.on('NodeChange', function(){
                if (tinywrap.props.onChange && typeof tinywrap.props.onChange == 'function')
                    tinywrap.props.onChange(tinymce.get(tinywrap.state.editorInstance).getContent());
            });

            ed.on('change', function(){
                if (tinywrap.props.onChange && typeof tinywrap.props.onChange == 'function')
                    tinywrap.props.onChange(tinymce.get(tinywrap.state.editorInstance).getContent());
            });

            ed.on('keyup', function(){
                if (tinywrap.props.onChange && typeof tinywrap.props.onChange == 'function')
                    tinywrap.props.onChange(tinymce.get(tinywrap.state.editorInstance).getContent());
            });

            ed.on('undo', function(){
                if (tinywrap.props.onChange && typeof tinywrap.props.onChange == 'function')
                    tinywrap.props.onChange(tinymce.get(tinywrap.state.editorInstance).getContent());
            });

            ed.on('redo', function(){
                if (tinywrap.props.onChange && typeof tinywrap.props.onChange == 'function')
                    tinywrap.props.onChange(tinymce.get(tinywrap.state.editorInstance).getContent());
            });

            ed.on('copy', function(){
                if (tinywrap.props.onChange && typeof tinywrap.props.onChange == 'function')
                    tinywrap.props.onChange(tinymce.get(tinywrap.state.editorInstance).getContent());
            });

            ed.on('cut', function(){
                if (tinywrap.props.onChange && typeof tinywrap.props.onChange == 'function')
                    tinywrap.props.onChange(tinymce.get(tinywrap.state.editorInstance).getContent());
            });

            ed.on('paste', function(){
                if (tinywrap.props.onChange && typeof tinywrap.props.onChange == 'function')
                    tinywrap.props.onChange(tinymce.get(tinywrap.state.editorInstance).getContent());
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