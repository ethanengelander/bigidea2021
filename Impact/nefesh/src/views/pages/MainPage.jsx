import "../../stylesheets/page/MainPage.css";
import { useEffect, useState } from "react"
import { db } from '../../scripts/firebase/config';
import { getDatabase, ref, onValue, query } from "firebase/database";
import { collection,  orderBy, onSnapshot, getDocs, where, getFirestore} from 'firebase/firestore';


const tags = ['newest','popular', 'recent'];
let eventFilter = ""
let eventListTemp = []

function App() {




   var searchOption;
   var filterOption;
   const db = getFirestore();
   const [articles, setArticles]= useState([])
   const [searchField, setSearchField] = useState('')
   

   function handleSearchByChange(ev){
    let temp = ev.target.value
    setSearchField(temp)
}

  async function getTarget(ev) {
    let arr2= [];
    if (ev.key === 'Enter') {
    ev.preventDefault();
    searchOption= ev.target.value;
    console.log(searchOption);
    const q = query(collection(db, "events"), where("Title", ">=", searchOption));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {  
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      arr2.push(doc.data());
    });
    if(searchField=== "popular"){
      for (var i = 1; i < arr2.length; i++)
      for (var j = 0; j < i; j++)
          if (arr2[i].views > arr2[j].views) {
            var x = arr2[i];
            arr2[i] = arr2[j];
            arr2[j] = x;
          }
  

  }
  else if (searchField=== "newest"){
    for (var i = 1; i < arr2.length; i++)
    for (var j = 0; j < i; j++)
        if (arr2[i].Date > arr2[j].Date) {
          var x = arr2[i];
          arr2[i] = arr2[j];
          arr2[j] = x;
        }
      }
  else if(searchField=== "recent"){
    for (var i = 1; i < arr2.length; i++)
    for (var j = 0; j < i; j++)
        if (arr2[i].dateAdded > arr2[j].dateAdded) {
          var x = arr2[i];
          arr2[i] = arr2[j];
          arr2[j] = x;
        }
  };
    setArticles(arr2);
    console.log(arr2)

    

    //insert filters
    //find articles with word in it, sort by which article has the word appear the most
    //for each article 
    // if newest --> check by date
    // if recent --> check by creation date
    // if popular --> check by most views



  
  }

}
    const [eventListState, setEventListState] = useState([])

    // const [eventFilterState,setEventFilterState]=useState("")
    useEffect(() => {
        const q = query(collection(db, "events"))
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const eventTemp = doc.data();
                eventTemp.id = doc.id;
                eventListTemp.push(eventTemp)
            })
            console.log('ping!')
            setEventListState(eventListTemp)
        })


    }, [])
    function test() {
        console.log(eventListTemp)
    }
    function changeEventFilter(ev) {
        // console.log('ping! changeeventfilter')
        eventListTemp = [...eventListState];
        eventFilter = ev.target.value
        if (eventFilter === "popular") {
            eventListTemp.sort(function (a, b) { return b.views - a.views })
            setEventListState(eventListTemp)
            console.log(eventListState)
        }
        if (eventFilter === "newest") {
            eventListTemp.forEach((doc) => {
                doc.dateCompare = doc.Date.replace(/\D/g, '')
            })
            eventListTemp.sort(function (a, b) { return b.dateAdded.seconds - a.dateAdded.seconds })
            setEventListState(eventListTemp)
            console.log(eventListTemp)
            console.log(eventListState)
        }
    }
    return (
        <div>
                
                <form className='searchFor' className="dropDown" onChange={handleSearchByChange}>
							<label for='searchFor' id='searchFor'>Search for:</label>
							<select id="searchDropdown" name='searchFor'>
								<option value='userID'>popular</option>
								<option value='displayName'>newest</option>
								<option value='email'>recent</option>
							</select>
						</form>
              <input className='searchBar' type="text" name= "searchBar" onKeyPress={getTarget} />
              {articles.map((article, i) => (
            <li className="travelcompany-input" key={i}>
                <span className="input-label"> {i+1}. {article.Title} Written on {article.Date} by {article.creator} and currently has {article.views} views</span> <img src= {article.Image}/> 
            </li>
           ))}
            <div className="userInterfaceContainer">
                <form className="filterEvents">
                    <label htmlFor="eventFilterType">Sort out the events displayed:</label>
                    <select name="eventFilterType" id="eventFilterType"
                        onChange={changeEventFilter}
                    >
                        <option value="newest">Newest to Oldest</option>
                        <option value="popular">Most Popular</option>
                        <option value="recent">Most Recent</option>
                    </select>
                </form>
                <div className="eventMapContainer">
                    {eventListState.map(event => {
                        return (
                            <div key={event.id} className='nametag'>
                                <h1>{event.Title}</h1>
                                <div>{event.id}</div>
                                <img src={event.Image} style={{ width: "100px" }}></img>
                                <div>This event will take place on: {event.Date}</div>
                                <div>{event.views} many people have viewed this event</div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
       

            <div className='container'>
              <div className='contianer2'>
              <div className="sectionOne">
                <h1>Nefesh B'Nefesh</h1>
                <button onChange={console.log("does nothing yet")}>|||</button>
              </div>
          
           </div>
           <button className='Button2'>Home Page</button>
            </div>
            </div>
          )
}

export default App;
