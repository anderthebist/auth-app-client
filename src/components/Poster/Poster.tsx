import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type OwnProps = {
    add: (text:string) => void
}

const Poster: React.FC<OwnProps> = ({add}) => {
    const editorRef = useRef<any>(null);
    const enterPost = () => {
        if (editorRef.current && editorRef.current.getContent()) {
            add(editorRef.current.getContent());
            editorRef.current.setContent('');
        }
    };

    return(
        <div className="post_editor">
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    min_height: 200,
                    height: 200,
                    max_height: 300,
                    menubar: false,
                    plugins: 'autolink fullscreen link advlist lists emoticons',
                    toolbar: `undo redo | bold italic underline strikethrough link casechange | emoticons removeformat `,
                    a_plugin_option: true,
                    a_configuration_option: 400
                }}
            />
            <div className = "poster_btn">
                <button className = "btn" onClick = {enterPost}>Создать</button>
            </div>
        </div>
    );
}

export default Poster;