import React, { useEffect, useRef, useState } from 'react';
import SearchRecomend from '../SearchRecomend/SearchRecomend';

type OwnProps = {
    onChangeSearch: (text: string) => void,
    onItemClick: (item: any) => void
}

const SearchField: React.FC<OwnProps> = ({onChangeSearch, onItemClick, ...props}) => {
    const [searchText, setSeachText] = useState<string>("");
    const [isHidden, setHidden] = useState<boolean>(false);

    const ref = useRef<any>();

    const searchRealTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSeachText(text);
        onChangeSearch(text);
    }
    
    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
          if (props.children && ref.current && !ref.current.contains(e.target)) {
            setHidden(true)
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [props.children])

    return (
        <div className = "search__users__field" ref = {ref}>
            <input type="text" className = "search_users__input" placeholder = "Поиск" 
            value = {searchText}  onChange = {searchRealTime} onFocus = {() => setHidden(false)} />
            <SearchRecomend content = {props.children} isHidden = {isHidden} />
        </div>
    );
}



export default SearchField;