"use client";

import { useId, useState } from "react";
import Link from "next/link";
import styles from "./LoginView.module.css";

// There is no authentication or order backend yet, so every submit stops at
// a "not available yet" notice instead of pretending to succeed. Swap the
// body of these handlers for the real calls once they exist.
const NOT_READY = {
  login: "회원 로그인은 준비 중입니다.",
  guest: "비회원 주문 조회는 준비 중입니다.",
} as const;

type LookupBy = "order" | "phone";

// /login — a functional page, not a landing: breadcrumb, one plain page
// title, then member login (left) and guest order lookup (right) as two
// fixed-width forms. Their fields are spaced so both submit buttons sit on
// the same line.
export default function LoginView() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">로그인</li>
          </ol>
        </nav>

        <h1 className={styles.title}>회원 로그인</h1>

        <div className={styles.grid}>
          <MemberLogin />
          <GuestLookup />
        </div>
      </div>
    </main>
  );
}

function MemberLogin() {
  const [notice, setNotice] = useState("");
  const id = useId();

  const notReady = (message: string = NOT_READY.login) => setNotice(message);

  return (
    <section className={styles.column} aria-labelledby={`${id}-title`}>
      <h2 className={styles.columnTitle} id={`${id}-title`}>
        회원 로그인
      </h2>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          notReady();
        }}
      >
        <div className={styles.field}>
          <label htmlFor={`${id}-email`} className={styles.label}>
            이메일
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="이메일을 입력해주세요"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={`${id}-password`} className={styles.label}>
            비밀번호
          </label>
          <input
            id={`${id}-password`}
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력해주세요"
            className={styles.input}
            required
          />
        </div>

        <label className={styles.check}>
          <input type="checkbox" name="remember" className={styles.checkbox} />
          로그인 상태 유지
        </label>

        <button type="submit" className={styles.primary}>
          로그인
        </button>
        <p className={styles.notice} role="status">
          {notice}
        </p>
      </form>

      <ul className={styles.utilities}>
        {[
          { label: "이메일 찾기", message: "이메일 찾기는 준비 중입니다." },
          { label: "비밀번호 찾기", message: "비밀번호 찾기는 준비 중입니다." },
          { label: "회원가입", message: "회원가입은 준비 중입니다." },
        ].map(({ label, message }) => (
          <li key={label}>
            <button
              type="button"
              className={styles.utility}
              onClick={() => notReady(message)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.social}>
        <p className={styles.socialLabel}>간편 로그인</p>
        <div className={styles.socialButtons}>
          {/* Temporary marks until the providers' own buttons are wired up */}
          {[
            { mark: "K", label: "카카오 로그인" },
            { mark: "N", label: "네이버 로그인" },
          ].map(({ mark, label }) => (
            <button
              key={mark}
              type="button"
              className={styles.socialButton}
              aria-label={label}
              title={label}
              onClick={() => notReady(`${label}은 준비 중입니다.`)}
            >
              {mark}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuestLookup() {
  const [by, setBy] = useState<LookupBy>("phone");
  const [notice, setNotice] = useState("");
  const id = useId();

  return (
    <section
      className={`${styles.column} ${styles.guest}`}
      aria-labelledby={`${id}-title`}
    >
      <h2 className={styles.columnTitle} id={`${id}-title`}>
        비회원 주문/배송 조회
      </h2>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(NOT_READY.guest);
        }}
      >
        <div className={styles.field}>
          <label htmlFor={`${id}-name`} className={styles.label}>
            이름
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="주문자 이름을 입력해주세요"
            className={styles.input}
            required
          />
        </div>

        <fieldset className={styles.field}>
          <legend className={styles.label}>조회 방법</legend>
          <div className={styles.radios}>
            {(
              [
                { value: "order", label: "주문번호" },
                { value: "phone", label: "휴대폰번호" },
              ] as const
            ).map(({ value, label }) => (
              <label key={value} className={styles.radio}>
                <input
                  type="radio"
                  name="lookupBy"
                  value={value}
                  checked={by === value}
                  onChange={() => {
                    setBy(value);
                    setNotice("");
                  }}
                  className={styles.radioInput}
                />
                {label}
              </label>
            ))}
          </div>

          {/* Keyed so switching method gives a fresh, empty field */}
          {by === "phone" ? (
            <input
              key="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="휴대폰번호를 입력해주세요 ('-' 없이)"
              aria-label="휴대폰번호"
              className={styles.input}
              pattern="[0-9\-]{10,13}"
              required
            />
          ) : (
            <input
              key="order"
              name="orderNumber"
              type="text"
              placeholder="주문번호를 입력해주세요"
              aria-label="주문번호"
              className={styles.input}
              required
            />
          )}
        </fieldset>

        <button type="submit" className={styles.primary}>
          조회
        </button>
        <p className={styles.notice} role="status">
          {notice}
        </p>
      </form>

      <p className={styles.help}>
        비회원으로 주문하신 경우, 주문 시 입력한 정보로
        <br />
        배송 상태를 확인할 수 있습니다.
      </p>
    </section>
  );
}
