const commonColors = {
  white: '#fff',
  black: '#000',
  transparent: 'transparent',
};

const primary = {
  primary1: '#fcfdfe',
  primary2: '#f6f9ff',
  primary3: '#ecf2ff',
  primary4: '#ddeaff',
  primary5: '#cddfff',
  primary6: '#b9d2ff',
  primary7: '#a2bfff',
  primary8: '#81a5f9',
  primary9: '#3a6af8',
  primary10: '#345fde',
  primary11: '#305ad8',
  primary12: '#192d63',

  primaryA1: '#0055aa03',
  primaryA2: '#0055ff09',
  primaryA3: '#0051ff13',
  primaryA4: '#0062ff22',
  primaryA5: '#005cff32',
  primaryA6: '#005cff46',
  primaryA7: '#0050ff5d',
  primaryA8: '#0049f37e',
  primaryA9: '#003ef6c5',
  primaryA10: '#0036d6cb',
  primaryA11: '#0034cfcf',
  primaryA12: '#001652e6',

  primaryContrast: '#fff',
  primarySurface: '#f4f8ffcc',
  primaryIndicator: '#3a6af8',
  primaryTrack: '#3a6af8',
} as const;

const primaryDark = {
  primary1: '#0c111c',
  primary2: '#111725',
  primary3: '#172448',
  primary4: '#1d2e61',
  primary5: '#243974',
  primary6: '#2d4484',
  primary7: '#375098',
  primary8: '#405eb2',
  primary9: '#3d63dd',
  primary10: '#3f5cb0',
  primary11: '#93b4ff',
  primary12: '#d5e2ff',

  primaryA1: '#0012fb0c',
  primaryA2: '#1156f916',
  primaryA3: '#2b64ff3b',
  primaryA4: '#3567ff56',
  primaryA5: '#3f71fd6b',
  primaryA6: '#4b7afd7c',
  primaryA7: '#5480ff91',
  primaryA8: '#5783ffad',
  primaryA9: '#4571ffdb',
  primaryA10: '#5580feab',
  primaryA11: '#93b4ff',
  primaryA12: '#d5e2ff',

  primaryContrast: '#fff',
  primarySurface: '#111d3980',
  primaryIndicator: '#3d63dd',
  primaryTrack: '#3d63dd',
};

const neutral = {
  neutral1: '#fcfcfd',
  neutral2: '#f9f9fb',
  neutral3: '#eff0f3',
  neutral4: '#e7e8ec',
  neutral5: '#e0e1e6',
  neutral6: '#d8d9e0',
  neutral7: '#cdced7',
  neutral8: '#b9bbc6',
  neutral9: '#8b8d98',
  neutral10: '#80828d',
  neutral11: '#62636c',
  neutral12: '#1e1f24',

  neutralA1: '#00005503',
  neutralA2: '#00005506',
  neutralA3: '#00104010',
  neutralA4: '#000b3618',
  neutralA5: '#0009321f',
  neutralA6: '#00073527',
  neutralA7: '#00063332',
  neutralA8: '#00083046',
  neutralA9: '#00051d74',
  neutralA10: '#00051b7f',
  neutralA11: '#0002119d',
  neutralA12: '#000107e1',

  neutralContrast: '#FFFFFF',
  neutralSurface: '#ffffffcc',
  neutralIndicator: '#8b8d98',
  neutralTrack: '#8b8d98',
} as const;

const neutralDark = {
  neutral1: '#111113',
  neutral2: '#19191b',
  neutral3: '#222325',
  neutral4: '#292a2e',
  neutral5: '#303136',
  neutral6: '#393a40',
  neutral7: '#46484f',
  neutral8: '#5f606a',
  neutral9: '#6c6e79',
  neutral10: '#797b86',
  neutral11: '#b2b3bd',
  neutral12: '#eeeef0',

  neutralA1: '#1111bb03',
  neutralA2: '#cbcbf90b',
  neutralA3: '#d6e2f916',
  neutralA4: '#d1d9f920',
  neutralA5: '#d7ddfd28',
  neutralA6: '#d9defc33',
  neutralA7: '#dae2fd43',
  neutralA8: '#e0e3fd60',
  neutralA9: '#e0e4fd70',
  neutralA10: '#e3e7fd7e',
  neutralA11: '#eff0feb9',
  neutralA12: '#fdfdffef',

  neutralContrast: '#FFFFFF',
  neutralSurface: 'rgba(0, 0, 0, 0.05)',
  neutralIndicator: '#6c6e79',
  neutralTrack: '#6c6e79',
} as const;

const red = {
  red1: '#fffcfc',
  red2: '#fff7f7',
  red3: '#ffebea',
  red4: '#ffdcd9',
  red5: '#ffcdca',
  red6: '#febdb9',
  red7: '#f5a9a5',
  red8: '#eb8f8b',
  red9: '#e5484d',
  red10: '#d73840',
  red11: '#cc2e39',
  red12: '#64181b',

  redA1: '#ff000003',
  redA2: '#ff000008',
  redA3: '#ff0d0015',
  redA4: '#ff150026',
  redA5: '#ff0f0035',
  redA6: '#fc0f0046',
  redA7: '#e30c015a',
  redA8: '#d4090074',
  redA9: '#db0007b7',
  redA10: '#cc000ac7',
  redA11: '#c1000ed1',
  redA12: '#540003e7',

  redContrast: '#fff',
  redSurface: '#fff5f5cc',
  redIndicator: '#e5484d',
  redTrack: '#e5484d',
} as const;

const redDark = {
  red1: '#170f0e',
  red2: '#201312',
  red3: '#3b1212',
  red4: '#500f13',
  red5: '#61171a',
  red6: '#732425',
  red7: '#8c3434',
  red8: '#b54546',
  red9: '#e5484d',
  red10: '#d63941',
  red11: '#ff8f8b',
  red12: '#ffd2ce',

  redA1: '#ec000007',
  redA2: '#f22f2011',
  redA3: '#ff17172d',
  redA4: '#fe0a1944',
  redA5: '#ff232c56',
  redA6: '#ff404269',
  redA7: '#ff555584',
  redA8: '#ff5d5eb0',
  redA9: '#fe4e54e4',
  redA10: '#fe414bd4',
  redA11: '#ff8f8b',
  redA12: '#ffd2ce',

  redContrast: '#fff',
  redSurface: '#2f151380',
  redIndicator: '#e5484d',
  redTrack: '#e5484d',
} as const;

const green = {
  green1: '#fbfefc',
  green2: '#f4fbf7',
  green3: '#e5f6eb',
  green4: '#d6f1df',
  green5: '#c4e8d1',
  green6: '#adddc0',
  green7: '#8fcea8',
  green8: '#60b887',
  green9: '#30a46c',
  green10: '#289662',
  green11: '#00814c',
  green12: '#1d3b2a',

  greenA1: '#00c04004',
  greenA2: '#00a3460b',
  greenA3: '#00a73b1a',
  greenA4: '#00a83829',
  greenA5: '#019c393b',
  greenA6: '#00963c52',
  greenA7: '#00903970',
  greenA8: '#008d3f9f',
  greenA9: '#008f4acf',
  greenA10: '#008345d7',
  greenA11: '#00814c',
  greenA12: '#00220fe2',

  greenContrast: '#fff',
  greenSurface: '#f1faf5cc',
  greenIndicator: '#30a46c',
  greenTrack: '#30a46c',
} as const;

const greenDark = {
  green1: '#0c130f',
  green2: '#121b16',
  green3: '#152c1f',
  green4: '#143b27',
  green5: '#1b4930',
  green6: '#23573b',
  green7: '#2b6848',
  green8: '#327c55',
  green9: '#30a46c',
  green10: '#1d9760',
  green11: '#63d196',
  green12: '#b2f1cb',

  greenA1: '#00bb0003',
  greenA2: '#29f9850b',
  greenA3: '#35ff8d1d',
  greenA4: '#22ff8e2d',
  greenA5: '#3cff953c',
  greenA6: '#4fffa04b',
  greenA7: '#58fda65e',
  greenA8: '#5bffa873',
  greenA9: '#44ffa49e',
  greenA10: '#27ff9d90',
  greenA11: '#77ffb6ce',
  greenA12: '#bcffd7f0',

  greenContrast: '#fff',
  greenSurface: '#13251b80',
  greenIndicator: '#30a46c',
  greenTrack: '#30a46c',
} as const;

const lightThemeColors = {
  ...commonColors,
  ...primary,
  ...neutral,
  ...red,
  ...green,

  background: '#fff',
  overlay: neutral.neutralA6,
  shadow: neutral.neutralA9,
} as const;

const darkThemeColors = {
  ...commonColors,
  ...primaryDark,
  ...neutralDark,
  ...redDark,
  ...greenDark,

  background: '#020202',
  overlay: neutral.neutralA8,
  shadow: neutral.neutralA11,
} as const;

type Color = 'primary' | 'neutral' | 'red' | 'green';
export type ColorStep =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | 'Contrast'
  | 'Surface'
  | 'Indicator'
  | 'Track';

export { lightThemeColors, darkThemeColors };
export type { Color };
