export enum Rules {
  SOFT = 'SOFT',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EXPERT = 'EXPERT',
  GOLD = 'GOLD',
}

export const getRules = (action: Rules) => {
  switch (action) {
    case 'SOFT': {
      return 10;
    }
    case 'MEDIUM': {
      return 50;
    }
    case 'HARD': {
      return 100;
    }
    case 'EXPERT': {
      return 400;
    }
    case 'GOLD': {
      return 1000;
    }
    default: {
      console.log('Invalid choice');
      return 0;
    }
  }
};
