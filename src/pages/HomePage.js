import React from "react";
import PropTypes from "prop-types";
import { useSearchParams} from "react-router-dom";
import { getNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";
import AddButton from "../components/AddButton";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { getActiveNotes } from "../utils/network-data";
import { LocaleConsumer } from '../contexts/LocaleContext';

function HomePageWrapper (){
    const [seacrhParams, setSearchParams] = useSearchParams();
    const keyword = seacrhParams.get("keyword");
    const navigate = useNavigate();

    const onAdd = () => {
        getNote();
        navigate('/notes/new');
    }

    function changeSearchParams(keyword){
        setSearchParams({keyword});
    }

    return <HomePage 
        defaultKeyword={keyword}
        keywordChange = {changeSearchParams}
        onAdd={onAdd}/>
}

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            notes:[],
            keyword:props.defaultKeyword||"",
        }

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
        this.onAdd = props.onAdd;
    }

    async componentDidMount() {
        const { data } = await getActiveNotes();

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
            <section className="homepage">
              <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
              <section className="search-bar">
              <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
              </section>
              <NoteList notes={notes}/>
              <div className="homepage__action">
              <AddButton onAdd={this.onAdd}/>
              </div>
            </section>
            );
          }
        }
      </LocaleConsumer>
    )
    }
}

HomePage.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func,
    onAdd: PropTypes.func,
}

export default HomePageWrapper;