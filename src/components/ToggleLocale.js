import { LocaleConsumer } from '../contexts/LocaleContext';
import { BsTranslate } from "react-icons/bs";
import { RiTranslate } from "react-icons/ri";

function ToggleLocale() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return <button className="toggle-locale" onClick={toggleLocale}>{locale === 'id' ? <RiTranslate/> : <BsTranslate/> }</button>;
      }}
    </LocaleConsumer>
  );
}

export default ToggleLocale;