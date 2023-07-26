interface Exercise {
  id: string;
  Category: string;
  Difficulty: string;
  Force: string;
  Grips: string;
  details: string;
  exercise_name: string;
  steps: string[];
  target: { Primary: string[] };
  videoURL: string[];
  youtubeURL: string;
}

export default Exercise;
