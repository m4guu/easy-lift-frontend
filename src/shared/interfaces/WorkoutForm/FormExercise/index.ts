import FormSet from "../FormSet";

interface FormExercise {
  name: string;
  id: string;
  _id: string;
  sets: FormSet[];
}

export default FormExercise;
