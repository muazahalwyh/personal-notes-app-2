import React from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/network-data";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { LocaleConsumer } from '../contexts/LocaleContext';

function ArchivedPageWrapper (){
    const [seacrhParams, setSearchParams] = useSearchParams();
    const keyword = seacrhParams.get("keyword");

    function changeSearchParams(keyword){
        setSearchParams({keyword});
    }

    return <ArchivedPage 
        defaultKeyword={keyword}
        keywordChange = {changeSearchParams}/>
}

class ArchivedPage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            notes:[ ],
            keyword:props.defaultKeyword||"",
        }

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this)
    }

    async componentDidMount() {
        const { data } = await getArchivedNotes();

        this.setState(() => {
            return {
                notes: data
            }
        });
    }

    onKeywordChangeHandler(keyword) {
        this.setState(() =>{
            return{
                keyword,
            }
        });
        this.props.keywordChange(keyword);
    }
    render(){
        const notes = this.state.notes.filter((note) =>{
            return note.title.toLowerCase().includes(
                this.state.keyword.toLowerCase()
            );
        });
    
    return (
        <LocaleConsumer>
        {
          ({ locale }) => {
            return(
            <section className="achives-page">
              <h2>{locale === 'id' ? 'Catatan Terarsip' : 'Archived Notes'}</h2>
              <section className="search-bar">
              <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
              </section>
              <section className="notes-list-empty">
                <NoteList notes={notes}/>
              </section>
            </section>
            );
          }
        }
        </LocaleConsumer>
      )
    }
}

ArchivedPage.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func,
}


export default ArchivedPageWrapper;