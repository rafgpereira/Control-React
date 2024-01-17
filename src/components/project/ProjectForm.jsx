import { useEffect, useState } from "react";

import Input from "../Form/Input";
import Select from "../Form/Select";
import SubmitButton from "../Form/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm({ btnText, handleSubmit, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACKEND}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        placeholder="Insira o nome do projeto"
        text="Nome do projeto"
        name="name"
        handleOnChange={handleChange}
        value={project.name ? project.name : ""}
      />

      <Input
        type="number"
        placeholder="Insira o orçamento total"
        text="Orçamento do projeto"
        name="budget"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      />

      <Select
        name="category_id"
        text="Selecione a categoria:"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ""}
      />

      <SubmitButton text={btnText} />
    </form>
  );
}
export default ProjectForm;
