import React, { useEffect, useState } from 'react'
import axios from "axios"
//import logo from './logo.svg'
import './App.css'
import 'bulma/css/bulma.min.css'
import {match} from "assert"
/*
<img src={logo} className="App-logo" alt="logo" />
*/

interface FormProps {
  onSubmit: (data: FormData) => void
}

interface FormData {
  date: string
  hourMin: string
  lat: number
  lng: number
  gmt: number
  color: number
  aspect: number
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
    date: "1984-04-01", hourMin: "00:00", lat: 46.12, lng: 6.09, gmt: 2, color: 0,
    aspect: 1,
    Soleil: true,
    Lune: true,
    Mercure: true,
    Venus: true,
    Mars: true,
    Jupiter: true,
    Saturne: true,
    Uranus: true,
    Neptune: true,
    Pluton: true,
    NoeudLunaire: true,
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
    const hourMin = formData.hourMin.split(":")
    const date = formData.date.split("-")
    url += "cgi-bin/SweInterface.cgi?sw_json=true" +
        "&year=" + date[0] +
        "&month=" + date[1] +
        "&day=" + date[2] +
        "&hour=" + hourMin[0] +
        "&min=" + hourMin[1] +
        "&lat=" + formData.lat +
        "&lng=" + formData.lng +
        "&gmt=" + formData.gmt
    const response = await axios.get(url)
    const data = await response.data
    setBodies(data)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    getBodies()
  }

  function handleCheckboxChangeSoleil(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Soleil"]: !formData.Soleil })
    getBodies()
  }

  function handleCheckboxChangeLune(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Lune"]: !formData.Lune })
    getBodies()
  }

  function handleCheckboxChangeMercure(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Mercure"]: !formData.Mercure })
    getBodies()
  }

  function handleCheckboxChangeVenus(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Venus"]: !formData.Venus })
    getBodies()
  }

  function handleCheckboxChangeMars(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Mars"]: !formData.Mars })
    getBodies()
  }

  function handleCheckboxChangeJupiter(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Jupiter"]: !formData.Jupiter })
    getBodies()
  }

  function handleCheckboxChangeSaturne(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Saturne"]: !formData.Saturne })
    getBodies()
  }

  function handleCheckboxChangeUranus(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Uranus"]: !formData.Uranus })
    getBodies()
  }

  function handleCheckboxChangeNeptune(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Neptune"]: !formData.Neptune })
    getBodies()
  }

  function handleCheckboxChangePluton(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Pluton"]: !formData.Pluton })
    getBodies()
  }

  function handleCheckboxChangeNoeudLunaire(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["NoeudLunaire"]: !formData.NoeudLunaire })
    getBodies()
  }

  function handleCheckboxChangeChiron(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Chiron"]: !formData.Chiron })
    getBodies()
  }

  function handleCheckboxChangeCeres(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Ceres"]: !formData.Ceres })
    getBodies()
  }

  function handleCheckboxChangeNoeudLunaireSud(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["NoeudLunaireSud"]: !formData.NoeudLunaireSud })
    getBodies()
  }

  function handleCheckboxChangeAsc(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Asc"]: !formData.Asc })
    getBodies()
  }

  function handleCheckboxChangeMc(_event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, ["Mc"]: !formData.Mc })
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
      <td>
        <div className="Astre"
             style={{backgroundImage: "url(\"data:image/svg+xml;base64," + el.asset + "\")"}}/>
      </td>
      <td style={{textAlign: "left"}}>{el.nom}</td>
      <td>
        <div className="Sign"
             style={{backgroundImage: "url(\"data:image/svg+xml;base64," + el.sign.asset + "\")"}}/>
      </td>
      <td style={{textAlign: "right"}}>{el.deg}</td>
      <td style={{textAlign: "right"}}>°</td>
      <td style={{textAlign: "right"}}>{el.min}</td>
      <td style={{textAlign: "right"}}>'</td>
      <td style={{textAlign: "right"}}>{el.sec}</td>
      <td style={{textAlign: "right"}}>"</td>
      <td>
        <div className="Sign"
             style={{backgroundImage: "url(\"data:image/svg+xml;base64," + el.sign_transit.asset + "\")"}}/>
      </td>
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
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Soleil}
                             onChange={handleCheckboxChangeSoleil} />
        break
      case 1: // Lune
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Lune}
                             onChange={handleCheckboxChangeLune} />
        break
      case 2: // Mercure
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Mercure}
                             onChange={handleCheckboxChangeMercure} />
        break
      case 3: // Venus
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Venus}
                             onChange={handleCheckboxChangeVenus} />
        break
      case 4: // Mars
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Mars}
                             onChange={handleCheckboxChangeMars} />
        break
      case 5: // Jupiter
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Jupiter}
                             onChange={handleCheckboxChangeJupiter} />
        break
      case 6: // Saturne
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Saturne}
                             onChange={handleCheckboxChangeSaturne} />
        break
      case 7: // Uranus
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Uranus}
                             onChange={handleCheckboxChangeUranus} />
        break
      case 8: // Neptune
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Neptune}
                             onChange={handleCheckboxChangeNeptune} />
        break
      case 9: // Pluton
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Pluton}
                             onChange={handleCheckboxChangePluton} />
        break
      case 11: // Noeud Lunaire
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.NoeudLunaire}
                             onChange={handleCheckboxChangeNoeudLunaire} />
        break
      case 15: // Chiron
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Chiron}
                             onChange={handleCheckboxChangeChiron} />
        break
      case 17: // Ceres
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Ceres}
                             onChange={handleCheckboxChangeCeres} />
        break
      case 24: // Noeud Lunaire Sud
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.NoeudLunaireSud}
                             onChange={handleCheckboxChangeNoeudLunaireSud} />
        break
      case 98: // Asc
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Asc}
                             onChange={handleCheckboxChangeAsc} />
        break
      case 99: // Mc
        checkBox = <Checkbox label={el.nom}
                             asset={el.asset}
                             value={formData.Mc}
                             onChange={handleCheckboxChangeMc} />
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

  let aspect_options: number[] = []
  if (formData.Soleil) {
    aspect_options.push(0)
  }
  if (formData.Lune) {
    aspect_options.push(1)
  }
  if (formData.Mercure) {
    aspect_options.push(2)
  }
  if (formData.Venus) {
    aspect_options.push(3)
  }
  if (formData.Mars) {
    aspect_options.push(4)
  }
  if (formData.Jupiter) {
    aspect_options.push(5)
  }
  if (formData.Saturne) {
    aspect_options.push(6)
  }
  if (formData.Uranus) {
    aspect_options.push(7)
  }
  if (formData.Neptune) {
    aspect_options.push(8)
  }
  if (formData.Pluton) {
    aspect_options.push(9)
  }
  if (formData.NoeudLunaire) {
    aspect_options.push(11)
  }
  if (formData.Chiron) {
    aspect_options.push(15)
  }
  if (formData.Ceres) {
    aspect_options.push(17)
  }
  if (formData.NoeudLunaireSud) {
    aspect_options.push(24)
  }
  if (formData.Asc) {
    aspect_options.push(98)
  }
  if (formData.Mc) {
    aspect_options.push(99)
  }
  let aspect_option: string = "";
  aspect_options.forEach(el => {
    if (aspect_option != "") {
      aspect_option += ","
    }
    aspect_option += String(el)
  })
  if (aspect_option != "") {
    aspect_option = "&aspect_option=" + aspect_option
  }
  // Pour une meilleures présentation le code d'avant n'est pas executé
  if (formData.aspect == 0) {
    aspect_option = ""
  } else if (formData.aspect == 1) {
    aspect_option = "&aspect_option=0,1,2,3,4,5,6,8,9,11,98,99"
  } else if (formData.aspect == 2) {
      aspect_option = "&aspect_option=0,1,2,3,4,5,6,8,9,11,15,17,24,98,99"
  }
  const hourMin = formData.hourMin.split(":")
  const date = formData.date.split("-")
  return (
      <div className="App">
        <header className="App-header" style={{backgroundColor: formData.color == 0 ? "#ffffff" : "#282c34", color: formData.color == 0 ? "black" : "white"}}>
        <p />
        <p />
        <form onSubmit={handleSubmit}>
          <div className="columns">
            <div className="column">
                <div className="Chart" style={{backgroundImage: "url(\"https://astrologie-traditionnelle.net/cgi-bin/SweInterface.cgi?sw_chart=true" +
                      "&year=" + date[0] +
                      "&month=" + date[1] +
                      "&day=" + date[2] +
                      "&hour=" + hourMin[0] +
                      "&min=" + hourMin[1] +
                      "&lat=" + formData.lat +
                      "&lng=" + formData.lng +
                      "&gmt=" + formData.gmt +
                      "&color=" + formData.color +
                      aspect_option + "\")"}}></div>
            </div>
            <div className="column">
              <fieldset className="FieldSet">
                <label>
                  Date:
                  <br />
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                  Heure:
                  <br />
                  <input type="time" name="hourMin" value={formData.hourMin} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                  GMT:
                  <br />
                  <input type="number" name="gmt" value={formData.gmt} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                  Latitude:
                  <br />
                  <input type="number" name="lat" value={formData.lat} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                  Longitude:
                  <br />
                  <input type="number" name="lng" value={formData.lng} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                  Couleur:
                  <br />
                  <select name="color" value={formData.color} onChange={handleSelectChange}>
                    <option value="0">Clair</option>
                    <option value="1">Sombre</option>
                  </select>
                </label>
                <br />
                <label>
                  Aspect:
                  <br />
                  <select name="aspect" value={formData.aspect} onChange={handleSelectChange}>
                    <option value="0">Aucun</option>
                    <option value="1">Soleil à Noeud Lunaire + Asc et Mc</option>
                    <option value="2">Tous les aspects</option>
                  </select>
                </label>
              </fieldset>
            </div>
          </div>
          <div className="columns">
            <div className="column">
                <div className="table-container">
                  <table className="table is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                      <td colSpan={2} className="TableBodie">Astre</td>
                      <td colSpan={7} className="TableBodie">Natal</td>
                      <td colSpan={7} className="TableBodie">Transit</td>
                    </tr>
                    </thead>
                    <tbody>
                    {bodiesTr}
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <table>
                <tbody>
                {aspectTr}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </header>
    </div>
  )
}

export default App

/*
Problème c++
              <tr>
                <td colSpan={3}>
                  <fieldset>
                    <legend>Aspects:</legend>
                    {aspectCheckBox}
                  </fieldset>
                </td>
              </tr>
 */