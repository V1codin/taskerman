import ActiveLink from '@/modules/activeLink/ActiveLink';

export default function DefaultHeader() {
  return (
    <div className="header__log">
      <ActiveLink href="/login" activeClassName="active">
        <button className="log__btn">Log in</button>
      </ActiveLink>
      <ActiveLink href="/signup" activeClassName="active">
        <button className="log__btn log__btn_sign">Sign up</button>
      </ActiveLink>
    </div>
  );
}
