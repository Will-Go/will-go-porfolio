// Player
export const PLAYER_RADIUS = 0.35;
export const PLAYER_EYE_HEIGHT = 1.7;
export const PLAYER_SPEED = 7;
export const EYE = PLAYER_EYE_HEIGHT;
export const RADIUS = PLAYER_RADIUS;
export const SPEED = PLAYER_SPEED;

// Open world bounds — circular boundary keeps the player from getting lost
export const BOUNDARY_RADIUS = 24;
export const GROUND_SIZE = 64;

// Path / station visuals
export const PATH_WIDTH = 1.6;
export const STATION_CIRCLE_RADIUS = 2.4;

// voxel_computer_table.glb placement (tuned for the model's native scale)
export const COMPUTER_SCALE = 0.4;
export const COMPUTER_Y = 0;

// Station data — ordered walkthrough sequence
export interface IStation {
  id: string;
  step: number;
  position: [number, number, number];
  titleKey: string;
}

export const STATIONS: IStation[] = [
  {
    id: "welcome",
    step: 1,
    position: [0, 0, 16],
    titleKey: "threeExperience.welcome.title",
  },
  { id: "about", step: 2, position: [-7, 0, 9], titleKey: "about.title" },
  { id: "projects", step: 3, position: [7, 0, 3], titleKey: "projects.title" },
  { id: "skills", step: 4, position: [-7, 0, -3], titleKey: "skills.title" },
  {
    id: "education",
    step: 5,
    position: [7, 0, -9],
    titleKey: "education.title",
  },
  {
    id: "experience",
    step: 6,
    position: [0, 0, -16],
    titleKey: "experience.title",
  },
];

// Welcome zone — anchored to the welcome station so the floating-head bubble
// still triggers when the player approaches the start of the path.
export const WELCOME_ZONE = { x: 0, z: 16, r: 5 };
