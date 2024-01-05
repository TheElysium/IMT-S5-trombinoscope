import SearchIcon from '../assets/search.png';

export function SearchComponent(){
    return (
        <div id="search-bar">
            <img src={SearchIcon} alt="search"/>
            <input type="text" placeholder="rechercher un étudiant, une entreprise ..."/>
        </div>
    )
}