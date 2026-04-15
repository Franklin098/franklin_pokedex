jest.mock('react-native-config', () => ({
  API_BASE_URL: 'https://pokeapi.co/api/v2',
  BASE_IMAGE_URL:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork',
}));

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: jest.fn().mockImplementation(({children}) => children),
    Swipeable: jest.fn(),
    DrawerLayout: jest.fn(),
    State: {},
    ScrollView: jest.fn(),
    Slider: jest.fn(),
    Switch: jest.fn(),
    TextInput: jest.fn(),
    ToolbarAndroid: jest.fn(),
    ViewPagerAndroid: jest.fn(),
    DrawerLayoutAndroid: jest.fn(),
    WebView: jest.fn(),
    NativeViewGestureHandler: jest.fn(),
    TapGestureHandler: jest.fn(),
    FlingGestureHandler: jest.fn(),
    ForceTouchGestureHandler: jest.fn(),
    LongPressGestureHandler: jest.fn(),
    PanGestureHandler: jest.fn(),
    PinchGestureHandler: jest.fn(),
    RotationGestureHandler: jest.fn(),
    RawButton: jest.fn(),
    BaseButton: jest.fn(),
    RectButton: jest.fn(),
    BorderlessButton: jest.fn(),
    FlatList: jest.fn(),
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
    default: {
      install: jest.fn(),
    },
  };
});

jest.mock('react-native-safe-area-context', () => {
  const insets = {top: 47, right: 0, bottom: 34, left: 0};
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({children}) => children),
    SafeAreaView: jest.fn().mockImplementation(({children}) => children),
    useSafeAreaInsets: jest.fn().mockReturnValue(insets),
  };
});
