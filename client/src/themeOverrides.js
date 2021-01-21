import themePalette from './themePalette';

const overrides = {
  MuiButton: {
    containedPrimary: {
      backgroundColor: themePalette.primary.light,
    },
    label: {
      fontWeight: 'bold',
    }
  },
};

export default overrides;
