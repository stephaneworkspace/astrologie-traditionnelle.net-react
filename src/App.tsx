import React, { useEffect, useState } from 'react';
import axios from "axios"
//import logo from './logo.svg';
import './App.css';
/*
<img src={logo} className="App-logo" alt="logo" />
*/

interface FormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
  lat: number;
  lng: number;
  gmt: number;
  color: number;
}

interface JsonCgiApi {
  bodie: [{
    asset: string,
    nom: string,
    deg_min_sec: string,
    deg: number,
    min: number,
    sec: number,
    sign: {
      asset: string,
      id: number,
      nom: string,
    }
    deg_min_sec_transit: string,
    deg_transit: number,
    min_transit: number,
    sec_transit: number,
    sign_transit: {
      asset: string,
      id: number,
      nom: string,
    }
  }]
}

function App() {
  const [formData, setFormData] = React.useState<FormData>({ year: 1984, month: 4, day: 1, hour: 0, min: 0, lat: 46.12, lng: 6.09, gmt: 2, color: 1  });
  const [bodies, setBodies] = React.useState<JsonCgiApi>({
    bodie: [{
      asset: "",
      nom: "",
      deg_min_sec: "",
      deg: 0,
      min: 0,
      sec: 0,
      sign: {asset: "", id: 0, nom: ""},
      deg_min_sec_transit: "",
      deg_transit: 0,
      min_transit: 0,
      sec_transit: 0,
      sign_transit: {asset: "", id: 0, nom: ""}
    }]
  });

  const getBodies = async () => {
    const sw_debug = false;
    let url = "https://astrologie-traditionnelle.net/";
    if (sw_debug) {
      url = "http://localhost:8888/"
    }
    url += "cgi-bin/SweInterface.cgi?sw_json=true" +
        "&year=" + formData.year +
        "&month=" + formData.month +
        "&day=" + formData.day +
        "&hour=" + formData.hour +
        "&min=" + formData.min +
        "&lat=" + formData.lat +
        "&lng=" + formData.lng +
        "&gmt=" + formData.gmt;
    const response = await axios.get(url)
    const data = await response.data;
    setBodies(data);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    getBodies();
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  useEffect(() => {
    getBodies();
  }, []);

  const [selectValue, setSelectValue] = React.useState("");

  let bodiesTr: JSX.Element[] = [];
  bodies.bodie.forEach((el => {
    bodiesTr.push(<tr key={el.nom}>
      <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
      <td style={{textAlign: "left"}}>{el.nom}</td>
      <td><img src={"data:image/svg+xml;base64," + el.sign.asset} width={20} height={20} alt={el.sign.nom}/></td>
      <td style={{textAlign: "right"}}>{el.deg}</td>
      <td style={{textAlign: "right"}}>°</td>
      <td style={{textAlign: "right"}}>{el.min}</td>
      <td style={{textAlign: "right"}}>'</td>
      <td style={{textAlign: "right"}}>{el.sec}</td>
      <td style={{textAlign: "right"}}>"</td>
      <td><img src={"data:image/svg+xml;base64," + el.sign_transit.asset} width={20} height={20} alt={el.sign.nom}/></td>
      <td style={{textAlign: "right"}}>{el.deg_transit}</td>
      <td style={{textAlign: "right"}}>°</td>
      <td style={{textAlign: "right"}}>{el.min_transit}</td>
      <td style={{textAlign: "right"}}>'</td>
      <td style={{textAlign: "right"}}>{el.sec_transit}</td>
      <td style={{textAlign: "right"}}>"</td>
    </tr>)
  }))

  return (
      <div className="App">
      <header className="App-header" style={{backgroundColor: formData.color == 0 ? "#ffffff" : "#282c34", color: formData.color == 0 ? "black" : "white"}}>
        <div className="Chart" style={{backgroundImage: "url(\"http://astrologie-traditionnelle.net/cgi-bin/SweInterface.cgi?sw_chart=true" +
              "&year=" + formData.year +
              "&month=" + formData.month +
              "&day=" + formData.day +
              "&hour=" + formData.hour +
              "&min=" + formData.min +
              "&lat=" + formData.lat +
              "&lng=" + formData.lng +
              "&gmt=" + formData.gmt +
              "&color=" + formData.color + "\")"}}></div>
        <table>
          <tbody>
          {bodiesTr}
          </tbody>
        </table>
        <p />
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>
                    Année de naissance:
                    <input type="number" name="year" value={formData.year} onChange={handleInputChange} />
                  </label>
                </td>
                <td>
                  <label>
                    Mois de naissance:
                    <input type="number" name="month" value={formData.month} onChange={handleInputChange} />
                  </label>
                </td>
                <td>
                  <label>
                    Jour de naissance:
                    <input type="number" name="day" value={formData.day} onChange={handleInputChange} />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Heure de naissance:
                    <input type="number" name="hour" value={formData.hour} onChange={handleInputChange} />
                  </label>
                </td>
                <td>
                  <label>
                    Minute de naissance:
                    <input type="number" name="min" value={formData.min} onChange={handleInputChange} />
                  </label>
                </td>
                <td>
                  <label>
                    GMT à la naissance:
                    <input type="number" name="gmt" value={formData.gmt} onChange={handleInputChange} />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Latitude de naissance:
                    <input type="number" name="lat" value={formData.lat} onChange={handleInputChange} />
                  </label>
                </td>
                <td>
                  <label>
                    Longitude de naissance:
                    <input type="number" name="lng" value={formData.lng} onChange={handleInputChange} />
                  </label>
                </td>
                <td>
                  <label>
                    Couleur:
                    <br />
                    <select name="color" value={formData.color} onChange={handleSelectChange}>
                      <option value="0">Clair</option>
                      <option value="1">Sombre</option>
                    </select>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </header>
    </div>
  );
}

export default App;