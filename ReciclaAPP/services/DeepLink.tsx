import { PureComponent } from 'react';
import { Linking } from 'react-native';

// import linkingUri from '@utils/linkingUri';
const linkingUri = 'exp://127.0.0.1:19000/--/'

type DeepLinkingProps = {
  handleUniversalLink?: (...args: any[]) => any
}

class DeepLinking extends PureComponent<DeepLinkingProps, {}> {
  componentDidMount() {
    Linking.getInitialURL().then((url: any) => this.push(url));
    Linking.addEventListener('url', this.handleChange);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleChange);
  }

  handleChange = (e: any) => {
    this.push(e.url);
  }

  push = async (url = '') => {
    let baseUrl = linkingUri;
    console.log('push', url)
    if (baseUrl.endsWith('/+')) {
      baseUrl = baseUrl.slice(0, -2);
    }
    let pathname = url.replace(baseUrl, '');
    if (pathname.startsWith('/+')) {
      pathname = pathname.substr(2);
    }
    if (!url.startsWith(linkingUri) && this.props.handleUniversalLink) {
      this.props.handleUniversalLink({ url });
    } else if (pathname && pathname.length && pathname !== '/') {
      this.context.router.history.push(pathname);
    }
  }

  render() {
    return this.props.children;
  }
}
export default DeepLinking;
