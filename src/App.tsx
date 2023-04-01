import React from 'react';
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

function App() {
  const [formData, setFormData] = React.useState<FormData>({ year: 1984, month: 4, day: 1, hour: 0, min: 0, lat: 46.12, lng: 6.09, gmt: 2, color: 1  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const [selectValue, setSelectValue] = React.useState("");

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
        <form onSubmit={handleSubmit}>
          <table>
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
          </table>
        </form>
      </header>
    </div>
  );
}

export default App;