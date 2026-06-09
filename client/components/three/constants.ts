export const ROOM_WIDTH = 20;
export const ROOM_DEPTH = 16;
export const ROOM_HEIGHT = 5;
export const WALL_THICKNESS = 0.3;
export const HALF_W = ROOM_WIDTH / 2;
export const HALF_D = ROOM_DEPTH / 2;
export const PLAYER_RADIUS = 0.35;
export const PLAYER_EYE_HEIGHT = 1.7;
export const PLAYER_SPEED = 7;

// Short aliases for room dimensions
export const ROOM_W = ROOM_WIDTH;
export const ROOM_D = ROOM_DEPTH;
export const ROOM_H = ROOM_HEIGHT;
export const EYE = PLAYER_EYE_HEIGHT;
export const RADIUS = PLAYER_RADIUS;
export const SPEED = PLAYER_SPEED;

// Welcome zone
export const WELCOME_ZONE = { x: -2, z: 0, r: 4.5 };

// Wall section data
export interface IWallSection {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  titleKey: string;
}

export const WALL_SECTIONS: IWallSection[] = [
  {
    id: "about",
    position: [-4, 2.2, HALF_D - 0.3],
    rotation: [0, Math.PI, 0],
    titleKey: "about.title",
  },
  {
    id: "projects",
    position: [HALF_W - 0.3, 2.2, -3],
    rotation: [0, -Math.PI / 2, 0],
    titleKey: "projects.title",
  },
  {
    id: "skills",
    position: [0, 2.2, -HALF_D + 0.3],
    rotation: [0, 0, 0],
    titleKey: "skills.title",
  },
  {
    id: "education",
    position: [-HALF_W + 0.3, 2.2, 3],
    rotation: [0, Math.PI / 2, 0],
    titleKey: "education.title",
  },
  {
    id: "experience",
    position: [-HALF_W + 0.3, 2.2, -3],
    rotation: [0, Math.PI / 2, 0],
    titleKey: "experience.title",
  },
];
