import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Table, Row, Col, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { FaCheckCircle } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
// import DateTimePicker from 'react-datetime-picker';
// import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import "react-datepicker/dist/react-datepicker.css";
// import dateFormat, { masks } from "dateformat";

const AdminMatchesScreen = () => {

  const teamData = [
    { name: "BOBA Marine", shortName: 'GAM', ava: "https://media.discordapp.net/attachments/684269879892901945/914873691400204308/GAMesportslogo.png", id: "1" },
    { name: 'Sai Gon Joker', shortName: 'SGJ', ava: "https://media.discordapp.net/attachments/684269879892901945/914873691878342686/latest.png?width=447&height=447", id: "2" },
    { name: "Taipei Assassins", shortName: 'TPA', ava: "https://media.discordapp.net/attachments/684269879892901945/914873692398428191/latest.png?width=447&height=447", id: "3" },
    { name: "Gen.G", shortName: 'Gen.G', ava: "https://media.discordapp.net/attachments/684269879892901945/914873691643449364/2000.png?width=372&height=446", id: "4" },
    { name: "Panda Eports", shortName: 'PDE', ava: "https://media.discordapp.net/attachments/684269879892901945/914881729200807986/latest.png?width=447&height=447", id: "5" },
    { name: "Sunning", shortName: 'SN', ava: "https://media.discordapp.net/attachments/684269879892901945/914881818967285790/Suning_28esports29_logo.png", id: "6" }
  ]

  const [quametmoi, setQuametmoi] = useState(0)

  const [matchData, setMatchData] = useState([])

  const mockData = [
    { datetime: "2011-10-10T14:48:00", name1: 'Hanwha Life Esports', shortname1: "HLE", ava1: require("../assets/HLE.png"), name2: 'SK Telecom T1', shortname2: "SKT", ava2: require("../assets/T1.png"), status: "Open", result: "", id: "1" },
    { datetime: "2011-10-10T14:48:00", name1: 'SK Telecom T1', shortname1: "SKT", ava1: require("../assets/T1.png"), name2: 'Hanwha Life Esports', shortname2: "HLE", ava2: require("../assets/HLE.png"), status: "Close", result: "", id: "2" },
    { datetime: "2011-10-10T14:48:00", name1: 'SK Telecom T1', shortname1: "SKT", ava1: require("../assets/T1.png"), name2: 'Hanwha Life Esports', shortname2: "HLE", ava2: require("../assets/HLE.png"), status: "Done", result: "SKT", id: "3" },
    { datetime: "2011-10-10T14:48:00", name1: 'SK Telecom T1', shortname1: "SKT", ava1: require("../assets/T1.png"), name2: 'Hanwha Life Esports', shortname2: "HLE", ava2: require("../assets/HLE.png"), status: "Done", result: "SKT", id: "4" },
    { datetime: "2011-10-10T14:48:00", name1: 'SK Telecom T1', shortname1: "SKT", ava1: require("../assets/T1.png"), name2: 'Hanwha Life Esports', shortname2: "HLE", ava2: require("../assets/HLE.png"), status: "Open", result: "", id: "5" },
    { datetime: "2011-10-10T14:48:00", name1: 'SK Telecom T1', shortname1: "SKT", ava1: require("../assets/T1.png"), name2: 'Hanwha Life Esports', shortname2: "HLE", ava2: require("../assets/HLE.png"), status: "Open", result: "", id: "6" },
  ]

  useEffect(() => {
    // signin();
    getMatchesAdminAPI();
    return () => {

    }
    // getNoticesAPI();
  }, [])

  const chooseTeam = (shortName, matchId) => {
    let team = findTeamByName(shortName)
    setMatchData(matchData.map(item => {
      if (item.id === matchId) {
        if (shortName !== "") {
          return { ...item, name1: team.name, shortname1: team.shortName, ava1: team.ava }
        } else return { ...item, name1: "", shortname1: "", ava1: "" }
      }
      return item;
    }))
  }

  const chooseTeam2 = (shortName, matchId) => {
    let team = findTeamByName(shortName)
    setMatchData(matchData.map(item => {
      if (item.id === matchId) {
        if (shortName !== "") {
          return { ...item, name2: team.name, shortname2: team.shortName, ava2: team.ava }
        } else return { ...item, name2: "", shortname2: "", ava2: "" }
      }
      return item;
    }))
  }

  const chooseDate = (newDate, matchId) => {
    // alert(newDate)
    // let date = Date.parse(newDate);
    setMatchData(matchData.map(item => {
      if (item.id === matchId) {
        return { ...item, datetime: newDate }
      }
      return item;
    }))
  }

  const findTeamByName = (teamShortName) => {
    return teamData.find((item) => {
      return item.shortName === teamShortName;
    })
  }

  const addMatch = () => {
    setMatchData([newMatch(), ...matchData])
    console.log(matchData)
  }

  const newMatch = () => {
    setQuametmoi(quametmoi + 1);
    return { datetime: "", time: "", name1: '', shortname1: "", ava1: "", name2: '', shortname2: "", ava2: "", status: "", result: "", id: quametmoi }
  }

  const convertDate = (date) => {
    return Date.parse(date);
    // console.log(dateFormat(Date.parse(date),"dd/mm/yyyy hh:MM TT"));
    // return dateFormat(Date.parse(date),"dd/mm/yyyy hh:MM");
    // return dateFormat(Date.parse(date),"mm/dd/yyyy");
  }

  const chooseStatus = (status, matchId) => {
    setMatchData(matchData.map(item => {
      if (item.id === matchId) {
        return { ...item, status: status }
      }
      return item;
    }))
  }

  const chooseResult = (teamWin, matchId) => {
    setMatchData(matchData.map(item => {
      if (item.id === matchId) {
        return { ...item, result: teamWin }
      }
      return item;
    }))
  }

  const confirmMatch = (name1, name2, shortname1, shortname2, ava1, ava2, datetime, status, result, matchId) => {
    if (name1 === "" || name2 === "") {
      alert("Chưa chọn team kìa!");
      return;
    }
    if (datetime === "") {
      alert("Chưa chọn ngày kìa!");
      return;
    }
    setMatchData(matchData.map(item => {
      if (item.id === matchId) {
        if (status === "") {
          addMatchAdmin(shortname1, shortname2, datetime, ava1, ava2, name1, name2, matchId);
          return { ...item, status: "Open" }
        } else if (status === "Close") {
          setStatusMatchAdmin(matchId);
          if (result !== "") {
            setResultMatchAdmin(matchId, result);
            return { ...item, status: "Done" }
          } else return { ...item, status: status }
        } else {
          if (result !== "") {
            setResultMatchAdmin(matchId, result);
            return { ...item, status: "Done" }
          } else return { ...item, status: status }
        }
      }
      return item;
    }))
  }

  const updateId = (oldId, newId) => {
    setMatchData(matchData.map(item => {
      if (item.id === oldId) {
        return { ...item, id: newId, status: "Open"}
      }
      return item;
    }))
  }

  const deleteMatch = (matchId, status) => {
    if (status !== "") {
      deleteMatchAdmin(matchId);
    }
    setMatchData(
      matchData.filter(item =>
        item.id !== matchId
      )
    )
  }

  const disableTeamAndDate = (status) => {
    return status !== ""
  }

  const disableStatusAndResult = (status) => {
    return status === "" || status === "Done"
  }

  const addMatchAdmin = async (shortname1, shortname2, datetime, ava1, ava2, name1, name2, oldId) => {
    fetch('http://localhost:3000/api/admin/matches', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "shortname1": shortname1,
        "shortname2": shortname2,
        "datetime": datetime,
        "ava1": ava1,
        "ava2": ava2,
        "name1": name1,
        "name2": name2
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error(res.status)
      }
    }).then(resData => {
      alert("Add thanh cong");
      let newId = resData.id;
      updateId(oldId, newId);
      console.log("okok");
    }).catch((error) => {
      alert(error);
      console.error(error);
    })
  }

  const setStatusMatchAdmin = async (matchId) => {
    fetch(`http://localhost:3000/api/admin/matches/update/${matchId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error(res.status)
      }
    }).then(resData => {
      alert("set Status thanh cong")
      console.log("okok");
    }).catch((error) => {
      console.error(error);
    })
  }

  const setResultMatchAdmin = async (matchId, result) => {
    fetch(`http://localhost:3000/api/admin/matches/${matchId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "result": result
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error(res.status)
      }
    }).then(resData => {
      alert("set Result thanh cong")
      console.log("okok");
    }).catch((error) => {
      console.error(error);
    })
  }

  const deleteMatchAdmin = async (matchId) => {
    fetch(`http://localhost:3000/api/admin/matches/${matchId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error(res.status)
      }
    }).then(resData => {
      alert("Delete thanh cong")
      console.log("okok");
    }).catch((error) => {
      console.error(error);
    })
  }

  const getMatchesAdminAPI = () => {
    const APIurl = 'http://localhost:3000/api/admin/matches';
    fetch(APIurl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((resJson) => {
        const matchesData = resJson.matchs;
        setMatchData(matchesData);
        console.log(matchesData);
      })
      .catch((error) => {
        console.error(error);
      })
  }



  return (
    <>
      <Container fluid>
        <Row className='justify-content-md-end'>
          <Col className='justify-content-end d-flex bg-secondary py-2'>
            <Button>Logout</Button>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className='justify-content-md-end'>
          <Col className='justify-content-end d-flex pt-2'>
            <Button onClick={() => addMatch()}>Add Match</Button>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Table bordered>
          <thead>
            <tr>
              <th>STT</th>
              <th colSpan='3'>Team 1</th>
              <th colSpan='3'>Team 2</th>
              <th>Date</th>
              <th>Status</th>
              <th>Result</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              matchData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Form.Select aria-label="Choose team 1" defaultValue={item.shortname1} onChange={(e) => chooseTeam(e.target.value, item.id)} disabled={disableTeamAndDate(item.status)}>
                      <option value="" disabled>Choose team 1</option>
                      {
                        teamData.map((team) => (
                          <option key={team.shortName} value={team.shortName}>{team.name}</option>
                        ))
                      }
                    </Form.Select>
                  </td>
                  <td>{item.shortname1}</td>
                  <td>
                    {
                      item.ava1 !== "" ? <img src={item.ava1} alt="" width="70" height="50" /> : null
                    }
                  </td>
                  <td>
                    <Form.Select aria-label="Choose team 2" defaultValue={item.shortname2} onChange={(e) => chooseTeam2(e.target.value, item.id)} disabled={disableTeamAndDate(item.status)} >
                      <option value="" disabled>Choose team 2</option>
                      {
                        teamData.map((team) => (
                          <option key={team.shortName} value={team.shortName}>{team.name}</option>
                        ))
                      }
                    </Form.Select>
                  </td>
                  <td>{item.shortname2}</td>
                  <td>
                    {
                      item.ava2 !== "" ? <img src={item.ava2} alt="" width="70" height="50" /> : null
                    }
                  </td>
                  <td>
                    <DatePicker showTimeInput
                      disabled={disableTeamAndDate(item.status)}
                      dateFormat="MM/dd/yyyy hh:mm aa"
                      selected={convertDate(item.datetime)} onChange={(date) => chooseDate(date, item.id)}
                    />

                  </td>
                  <td>
                    <Form.Select aria-label="Choose status" value={item.status} onChange={(e) => chooseStatus(e.target.value, item.id)} disabled={disableStatusAndResult(item.status)} >
                      <option value="" disabled>Status</option>
                      <option value="Open" >Open</option>
                      <option value="Close" >Close</option>
                      <option value="Done" disabled>Done</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Select aria-label="Choose Team Win" value={item.result} onChange={(e) => chooseResult(e.target.value, item.id)} disabled={disableStatusAndResult(item.status)} >
                      <option value="">Result</option>
                      <option value={item.shortname1} >{item.shortname1}</option>
                      <option value={item.shortname2} >{item.shortname2}</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Row className='justify-content-md-center'>
                      <Col>
                        <Button variant="success" onClick={() => confirmMatch(item.name1, item.name2, item.shortname1, item.shortname2, item.ava1, item.ava2, item.datetime, item.status, item.result, item.id)}
                        disabled={item.status==="Done"}>
                          <FaCheckCircle size={20} />
                        </Button>
                      </Col>
                      <Col>
                        <Button variant="danger" onClick={() => deleteMatch(item.id, item.status)}>
                          <FaTrash size={20} />
                        </Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default AdminMatchesScreen;
