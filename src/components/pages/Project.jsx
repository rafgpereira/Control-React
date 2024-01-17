import { v4 as uuidv4} from 'uuid'

import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from '../service/ServiceCard';


function Project() {
  const { id } = useParams();

  console.log(id);

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [typeMsg, setTypeMsg] = useState()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACKEND}/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setServices(data.services)
      })
      .catch((err) => console.log(err));
  }, [id]);

  function editPost(project){
    setMessage('')
    if(project.budget < project.cost){
        setMessage('O custo não pode ser maior que o orçamento.')
        setTypeMsg('error')
        return false
    }
    fetch(`${process.env.REACT_APP_URL_BACKEND}/projects/${project.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project)
    }) 
    .then(resp => resp.json())
    .then(data=>{
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado com sucesso!')
        setTypeMsg('success')
    })
    .catch(err=>console.log(err))       
  }

  function createService(project){
    setMessage('')
    const lastService = project.services[project.services.length - 1]
    lastService.id = uuidv4()
    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    if(newCost > parseFloat(project.budget)){
      setMessage('Orçamento ultrapassado, verifique o valor do serviço.')
      setTypeMsg('error')
      project.services.pop()
      return false
    }
    project.cost=newCost
    fetch(`${process.env.REACT_APP_URL_BACKEND}/projects/${project.id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(project),
    }).then( resp=> resp.json())
    .then(data=>{
      setServices(data.services)
      setShowServiceForm(!showServiceForm)
      setMessage('Serviço adicionado com sucesso.')
      setTypeMsg('success')
    })
    .catch(err=> console.log(err))

  }

  function removeService(id, cost){
    setMessage('')
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id,
    )

    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`${process.env.REACT_APP_URL_BACKEND}/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso!')
        setTypeMsg('success')
      }).catch(err => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.button} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar projeto"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R${project.cost || 0}
                  </p>
                  <p>
                    <span>Disponível:</span> R${(parseFloat(project.budget) - parseFloat(project.cost)) || project.budget}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                    <ProjectForm handleSubmit={editPost} projectData={project} btnText="Concluir edição"/>
                </div>
              )}
            </div>
            {message && <Message type={typeMsg} msg={message}/>}
            <div className={styles.service_form_container}>
                <h2>Adicione um serviço:</h2>
                <button className={styles.button} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm &&(
                    <ServiceForm handleSubmit={createService} btnText='Adicionar Serviço' projectData={project}/>
                )}
              </div>
            </div>
            
            <h2>Serviços</h2>
            <Container customClass='start'>
                {services.length > 0 ? (
                  services.map(service=>(
                    <ServiceCard id={service.id} name={service.name} cost={service.cost} description={service.description} key={service.id} handleRemove={removeService}/>
                  ))
                ):(
                  <p>Não há serviços cadastrados.</p>
                )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Project;
