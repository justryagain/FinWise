import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '70%',
    maxWidth: 280,
    backgroundColor: 'rgba(30, 30, 30, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 15,
  },
  logoContainer: {
    position: 'absolute',
    top: '23%',
    zIndex: 1,
    alignItems: 'center',
    paddingLeft: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotText: {
    color: '#fff',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  signInButton: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#1DB954',
    marginTop: 10,
  },
  oauthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  oauthButtonWrapper: {
    width: '48%',
    height: 40,
    borderRadius: 3,
    overflow: 'hidden',
  },
  oauthButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  buttonLabel: {
    flex: 1,
    textAlign: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  accountPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptText: {
    color: '#fff',
    fontSize: 14,
  },
  linkText: {
    color: '#1DB954',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default styles;
