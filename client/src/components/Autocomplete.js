import { useRef, useEffect } from "react";

const AutoComplete = (props) => {
    const indx = props.indx
    const item = props.item;
    const handleLocation = props.handleLocation
    const autoCompleteRef = useRef();
    const inputRef = useRef();
 useEffect(() => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef.current,
  );
 }, []);

 return (
   <input ref={inputRef}/>
 );
};
export default AutoComplete;