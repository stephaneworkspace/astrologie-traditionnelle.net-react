import React, { useEffect, useState } from 'react'
import axios from "axios"
//import logo from './logo.svg';
import './App.css'
import {match} from "assert"
/*
<img src={logo} className="App-logo" alt="logo" />
*/

interface FormProps {
  onSubmit: (data: FormData) => void
}

interface FormData {
  year: number
  month: number
  day: number
  hour: number
  min: number
  lat: number
  lng: number
  gmt: number
  color: number
  Soleil: boolean
  Lune: boolean
  Mercure: boolean
  Venus: boolean
  Mars: boolean
  Jupiter: boolean
  Saturne: boolean
  Uranus: boolean
  Neptune: boolean
  Pluton: boolean
  NoeudLunaire: boolean
  Chiron: boolean
  Ceres: boolean
  NoeudLunaireSud: boolean
  Asc: boolean
  Mc: boolean
}

interface JsonCgiApi {
  aspect: [{
    id: number,
    nom: string,
    asset: string,
    liens: [{
      aspect_id?: number,
      aspect_name?: string,
      asset?: string,
      id: number,
      nom: string,
    }]
  }],
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
  const [formData, setFormData] = React.useState<FormData>({
    year: 1984, month: 4, day: 1, hour: 0, min: 0, lat: 46.12, lng: 6.09, gmt: 2, color: 1,
    Soleil: false,
    Lune: false,
    Mercure: false,
    Venus: false,
    Mars: false,
    Jupiter: false,
    Saturne: false,
    Uranus: false,
    Neptune: false,
    Pluton: false,
    NoeudLunaire: false,
    Ceres: false,
    Chiron: false,
    NoeudLunaireSud: false,
    Asc: false,
    Mc: false,
  })
  const [bodies, setBodies] = React.useState<JsonCgiApi>({
    aspect: [{
      id: 0,
      nom: "",
      asset: "",
      liens: [{
        aspect_id: undefined,
        aspect_name: undefined,
        asset: undefined,
        id: 0,
        nom: "",
      }]
    }],
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
  })

  const Checkbox = ({ label, asset, value, onChange }) => {
    return (
        <div>
          <input type="checkbox" name={label} checked={value} onChange={onChange} />
          <label htmlFor={label}>
            <img src={"data:image/svg+xml;base64," + asset} width={20} height={20} alt={label}/> {label}
          </label>
        </div>
    )
  }

  const getBodies = async () => {
    const sw_debug = false
    let url = "https://astrologie-traditionnelle.net/"
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
        "&gmt=" + formData.gmt
    const response = await axios.get(url)
    const data = await response.data
    setBodies(data)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    console.log(name)
    console.log(value)
    setFormData({ ...formData, [name]: value })
    getBodies()
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    switch (name) {
      case "Soleil":
        setFormData({ ...formData, [name]: !formData.Soleil })
        break
      case "Lune":
        setFormData({ ...formData, [name]: !formData.Lune })
        break
      case "Mercure":
        setFormData({ ...formData, [name]: !formData.Mercure })
        break
      case "Venus":
        setFormData({ ...formData, [name]: !formData.Venus })
        break
      case "Mars":
        setFormData({ ...formData, [name]: !formData.Mars })
        break
      case "Jupiter":
        setFormData({ ...formData, [name]: !formData.Jupiter })
        break
      case "Saturne":
        setFormData({ ...formData, [name]: !formData.Saturne })
        break
      case "Uranus":
        setFormData({ ...formData, [name]: !formData.Uranus })
        break
      case "Neptune":
        setFormData({ ...formData, [name]: !formData.Neptune })
        break
      case "Pluton":
        setFormData({ ...formData, [name]: !formData.Pluton })
        break
      case "NoeudLunaire":
        setFormData({ ...formData, [name]: !formData.NoeudLunaire })
        break
      case "Chiron":
        setFormData({ ...formData, [name]: !formData.Chiron })
        break
      case "Ceres":
        setFormData({ ...formData, [name]: !formData.Ceres })
        break
      case "NoeudLunaireSud":
        setFormData({ ...formData, [name]: !formData.NoeudLunaireSud })
        break
      case "Asc":
        setFormData({ ...formData, [name]: !formData.Asc })
        break
      case "Mc":
        setFormData({ ...formData, [name]: !formData.Mc })
        break
    }
    getBodies()
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  useEffect(() => {
    getBodies()
  }, [])

  const [selectValue, setSelectValue] = React.useState("")

  let bodiesTr: JSX.Element[] = []
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

  let aspectCheckBox: JSX.Element[] = []
  bodies.aspect.forEach(el => {
    let checkBox: JSX.Element = <div />
    switch (el.id) {
      case 0: // Soleil
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Soleil} onChange={handleCheckboxChange} />
        break
      case 1: // Lune
        checkBox = <Checkbox label={el.nom} asset={el.asset}  value={formData.Lune} onChange={handleCheckboxChange} />
        break
      case 2: // Mercure
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Mercure} onChange={handleCheckboxChange} />
        break
      case 3: // Venus
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Venus} onChange={handleCheckboxChange} />
        break
      case 4: // Mars
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Mars} onChange={handleCheckboxChange} />
        break
      case 5: // Jupiter
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Jupiter} onChange={handleCheckboxChange} />
        break
      case 6: // Saturne
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Saturne} onChange={handleCheckboxChange} />
        break
      case 7: // Uranus
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Uranus} onChange={handleCheckboxChange} />
        break
      case 8: // Neptune
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Neptune} onChange={handleCheckboxChange} />
        break
      case 9: // Pluton
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Pluton} onChange={handleCheckboxChange} />
        break
      case 11: // Noeud Lunaire
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.NoeudLunaire}
                             onChange={handleCheckboxChange} />
        break
      case 15: // Chiron
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Chiron} onChange={handleCheckboxChange} />
        break
      case 17: // Ceres
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Ceres} onChange={handleCheckboxChange} />
        break
      case 24: // Noeud Lunaire Sud
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.NoeudLunaireSud}
                             onChange={handleCheckboxChange} />
        break
      case 98: // Asc
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Asc} onChange={handleCheckboxChange} />
        break
      case 99: // Mc
        checkBox = <Checkbox label={el.nom} asset={el.asset} value={formData.Mc} onChange={handleCheckboxChange} />
        break
    }
    aspectCheckBox.push(
        <div key={el.id}>
          {checkBox}
        </div>)
  })

  let aspectTr: JSX.Element[] = []
  let soleil: JSX.Element = <div/>
  let lune: JSX.Element = <div/>
  let mercure: JSX.Element = <div/>
  let venus: JSX.Element = <div/>
  let mars: JSX.Element = <div/>
  let jupiter: JSX.Element = <div/>
  let saturne: JSX.Element = <div/>
  let uranus: JSX.Element = <div/>
  let neptune: JSX.Element = <div/>
  let pluton: JSX.Element = <div/>
  let noeudLunaire: JSX.Element = <div/>
  bodies.aspect.forEach((el => {
    let soleil = <div/>
    let lune = <div/>
    let mercure = <div/>
    let venus = <div/>
    let mars = <div/>
    let jupiter = <div/>
    let saturne = <div/>
    let uranus = <div/>
    let neptune = <div/>
    let pluton = <div/>
    let noeudLunaire = <div/>
    let chiron = <div/>
    let ceres = <div/>
    let noeudLunaireSud = <div/>
    switch (el.id) {
      case 0: // Soleil
        aspectTr.push(<tr key={el.id}>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={14}></td>
        </tr>)
        break
      case 1: // Lune
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 1 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={13}></td>
        </tr>)
        break
      case 2: // Mercure
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 2 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 2 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={12}></td>
        </tr>)
        break
      case 3: // Venus
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 3 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 3 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 3 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={11}></td>
        </tr>)
        break
      case 4: // Mars
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 4 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 4 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 4 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 4 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={10}></td>
        </tr>)
        break
      case 5: // Jupiter
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 5 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 5 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 5 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 5 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 5 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={9}></td>
        </tr>)
        break
      case 6: // Saturne
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 6 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 6 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 6 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 6 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 6 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 5 && b.id == 6 && b.asset != undefined) {
              jupiter =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td className="TableBorder">{jupiter}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={8}></td>
        </tr>)
        break
      case 7: // Uranus
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 7 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 7 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 7 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 7 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 7 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 5 && b.id == 7 && b.asset != undefined) {
              jupiter =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 6 && b.id == 7 && b.asset != undefined) {
              saturne =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td className="TableBorder">{jupiter}</td>
          <td className="TableBorder">{saturne}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={7}></td>
        </tr>)
        break
      case 8: // Neptune
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 8 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 8 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 8 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 8 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 8 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 5 && b.id == 8 && b.asset != undefined) {
              jupiter =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 6 && b.id == 8 && b.asset != undefined) {
              saturne =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 7 && b.id == 8 && b.asset != undefined) {
              uranus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td className="TableBorder">{jupiter}</td>
          <td className="TableBorder">{saturne}</td>
          <td className="TableBorder">{uranus}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={6}></td>
        </tr>)
        break
      case 9: // Pluton
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 9 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 9 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 9 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 9 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 9 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 5 && b.id == 9 && b.asset != undefined) {
              jupiter =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 6 && b.id == 9 && b.asset != undefined) {
              saturne =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 7 && b.id == 9 && b.asset != undefined) {
              uranus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 8 && b.id == 9 && b.asset != undefined) {
              neptune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td className="TableBorder">{jupiter}</td>
          <td className="TableBorder">{saturne}</td>
          <td className="TableBorder">{uranus}</td>
          <td className="TableBorder">{neptune}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={5}></td>
        </tr>)
        break
      case 11: // Noeud lunaire
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 11 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 11 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 11 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 11 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 11 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 5 && b.id == 11 && b.asset != undefined) {
              jupiter =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 6 && b.id == 11 && b.asset != undefined) {
              saturne =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 7 && b.id == 11 && b.asset != undefined) {
              uranus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 8 && b.id == 11 && b.asset != undefined) {
              neptune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 9 && b.id == 11 && b.asset != undefined) {
              pluton =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td className="TableBorder">{jupiter}</td>
          <td className="TableBorder">{saturne}</td>
          <td className="TableBorder">{uranus}</td>
          <td className="TableBorder">{neptune}</td>
          <td className="TableBorder">{pluton}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={4}></td>
        </tr>)
        break
      case 15: // Chrion
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 15 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 15 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 15 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 15 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 15 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 5 && b.id == 15 && b.asset != undefined) {
              jupiter =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 6 && b.id == 15 && b.asset != undefined) {
              saturne =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 7 && b.id == 15 && b.asset != undefined) {
              uranus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 8 && b.id == 15 && b.asset != undefined) {
              neptune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 9 && b.id == 15 && b.asset != undefined) {
              pluton =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 11 && b.id == 15 && b.asset != undefined) {
              noeudLunaire =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td className="TableBorder">{jupiter}</td>
          <td className="TableBorder">{saturne}</td>
          <td className="TableBorder">{uranus}</td>
          <td className="TableBorder">{neptune}</td>
          <td className="TableBorder">{pluton}</td>
          <td className="TableBorder">{noeudLunaire}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={3}></td>
        </tr>)
        break
      case 17: // Ceres
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 17 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 17 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 17 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 17 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 17 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 5 && b.id == 17 && b.asset != undefined) {
              jupiter =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 6 && b.id == 17 && b.asset != undefined) {
              saturne =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 7 && b.id == 17 && b.asset != undefined) {
              uranus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 8 && b.id == 17 && b.asset != undefined) {
              neptune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 9 && b.id == 17 && b.asset != undefined) {
              pluton =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 11 && b.id == 17 && b.asset != undefined) {
              noeudLunaire =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 15 && b.id == 17 && b.asset != undefined) {
              chiron =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td className="TableBorder">{jupiter}</td>
          <td className="TableBorder">{saturne}</td>
          <td className="TableBorder">{uranus}</td>
          <td className="TableBorder">{neptune}</td>
          <td className="TableBorder">{pluton}</td>
          <td className="TableBorder">{noeudLunaire}</td>
          <td className="TableBorder">{chiron}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={2}></td>
        </tr>)
        break
      case 24: // Noeud lunaire sud
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 24 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 24 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 24 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 24 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 24 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 5 && b.id == 24 && b.asset != undefined) {
              jupiter =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 6 && b.id == 24 && b.asset != undefined) {
              saturne =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 7 && b.id == 24 && b.asset != undefined) {
              uranus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 8 && b.id == 24 && b.asset != undefined) {
              neptune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 9 && b.id == 24 && b.asset != undefined) {
              pluton =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 11 && b.id == 24 && b.asset != undefined) {
              noeudLunaire =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 15 && b.id == 24 && b.asset != undefined) {
              chiron =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 17 && b.id == 24 && b.asset != undefined) {
              ceres =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td className="TableBorder">{jupiter}</td>
          <td className="TableBorder">{saturne}</td>
          <td className="TableBorder">{uranus}</td>
          <td className="TableBorder">{neptune}</td>
          <td className="TableBorder">{pluton}</td>
          <td className="TableBorder">{noeudLunaire}</td>
          <td className="TableBorder">{chiron}</td>
          <td className="TableBorder">{ceres}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
          <td colSpan={1}></td>
        </tr>)
        break
      case 98:
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 98 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 98 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 98 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 98 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 98 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 5 && b.id == 98 && b.asset != undefined) {
              jupiter =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 6 && b.id == 98 && b.asset != undefined) {
              saturne =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 7 && b.id == 98 && b.asset != undefined) {
              uranus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 8 && b.id == 98 && b.asset != undefined) {
              neptune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 9 && b.id == 98 && b.asset != undefined) {
              pluton =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 11 && b.id == 98 && b.asset != undefined) {
              noeudLunaire =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 15 && b.id == 98 && b.asset != undefined) {
              chiron =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 17 && b.id == 98 && b.asset != undefined) {
              ceres =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td className="TableBorder">{jupiter}</td>
          <td className="TableBorder">{saturne}</td>
          <td className="TableBorder">{uranus}</td>
          <td className="TableBorder">{neptune}</td>
          <td className="TableBorder">{pluton}</td>
          <td className="TableBorder">{noeudLunaire}</td>
          <td className="TableBorder">{chiron}</td>
          <td className="TableBorder">{ceres}</td>
          <td className="TableBorder">{noeudLunaireSud}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
        </tr>)
        break
      case 99:
        bodies.aspect.forEach(a => {
          a.liens.forEach(b => {
            if (a.id == 0 && b.id == 99 && b.asset != undefined) {
              soleil =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 1 && b.id == 99 && b.asset != undefined) {
              lune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 2 && b.id == 99 && b.asset != undefined) {
              mercure =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 3 && b.id == 99 && b.asset != undefined) {
              venus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 4 && b.id == 99 && b.asset != undefined) {
              mars =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 5 && b.id == 99 && b.asset != undefined) {
              jupiter =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 6 && b.id == 99 && b.asset != undefined) {
              saturne =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 7 && b.id == 99 && b.asset != undefined) {
              uranus =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 8 && b.id == 99 && b.asset != undefined) {
              neptune =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 9 && b.id == 99 && b.asset != undefined) {
              pluton =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 11 && b.id == 99 && b.asset != undefined) {
              noeudLunaire =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 15 && b.id == 99 && b.asset != undefined) {
              chiron =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
            if (a.id == 17 && b.id == 99 && b.asset != undefined) {
              ceres =
                  <img src={"data:image/svg+xml;base64," + b.asset} width={20} height={20} alt={b.aspect_name}/>
            }
          })
        })
        aspectTr.push(<tr key={el.id}>
          <td className="TableBorder">{soleil}</td>
          <td className="TableBorder">{lune}</td>
          <td className="TableBorder">{mercure}</td>
          <td className="TableBorder">{venus}</td>
          <td className="TableBorder">{mars}</td>
          <td className="TableBorder">{jupiter}</td>
          <td className="TableBorder">{saturne}</td>
          <td className="TableBorder">{uranus}</td>
          <td className="TableBorder">{neptune}</td>
          <td className="TableBorder">{pluton}</td>
          <td className="TableBorder">{noeudLunaire}</td>
          <td className="TableBorder">{chiron}</td>
          <td className="TableBorder">{ceres}</td>
          <td className="TableBorder">{noeudLunaireSud}</td>
          <td><img src={"data:image/svg+xml;base64," + el.asset} width={20} height={20} alt={el.nom}/></td>
        </tr>)
        break
    }
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
        <table>
          <tbody>
          {aspectTr}
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
              <tr>
                <td colSpan={3}>
                  <fieldset>
                    <legend>Aspects:</legend>
                    {aspectCheckBox}
                  </fieldset>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </header>
    </div>
  )
}

export default App