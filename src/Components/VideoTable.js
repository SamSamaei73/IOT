import React from 'react';
import "../Scss/Main.scss";
import Header from './Items/Header';


const VideoTable = (HeaderTitle) => {
  return (
    <div className='VideoTable'>
        <div className="shadow">
         <Header HeaderTitle='Videos'/>
        <table>
            <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
            </tr>
            <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
            </tr>
            <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
            </tr>
        </table>
        </div>
    </div>
  )
}

export default VideoTable