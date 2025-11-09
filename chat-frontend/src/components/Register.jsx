import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRegister, apiCheckUsername } from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [dupChecked, setDupChecked] = useState(false);
  const navigate = useNavigate();

  // ✅ 개별 필드 유효성 검사 함수
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "username":
        if (!value.trim()) message = "아이디를 입력하세요.";
        else if (!/^[a-zA-Z0-9]{4,20}$/.test(value))
          message = "아이디는 영문과 숫자 4~20자 이내여야 합니다.";
        else if (!dupChecked) message = "아이디 중복검사를 완료해주세요.";
        break;

      case "password":
        if (!value.trim()) message = "비밀번호를 입력하세요.";
        else if (value.length < 8 || value.length > 20)
          message = "비밀번호는 8~20자 사이로 입력하세요.";
        else if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value))
          message = "비밀번호는 영문과 숫자를 모두 포함해야 합니다.";
        // 비밀번호 변경 시 비밀번호 확인도 다시 검사
        if (form.passwordConfirm && value !== form.passwordConfirm)
          setErrors((prev) => ({
            ...prev,
            passwordConfirm: "비밀번호가 일치하지 않습니다.",
          }));
        else setErrors((prev) => ({ ...prev, passwordConfirm: "" }));
        break;

      case "passwordConfirm":
        if (value !== form.password) message = "비밀번호가 일치하지 않습니다.";
        break;

      case "name":
        if (!value.trim()) message = "이름을 입력하세요.";
        else if (!/^[가-힣a-zA-Z\s]+$/.test(value))
          message = "이름에는 특수문자를 사용할 수 없습니다.";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  // ✅ 입력 변경 핸들러 (타이핑할 때마다 실시간 검사)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setDupChecked(name === "username" ? false : dupChecked);
    validateField(name, value);
  };

  // ✅ 아이디 중복 검사
  const handleCheck = async () => {
    const username = form.username.trim();
    if (!username) {
      setErrors((prev) => ({ ...prev, username: "아이디를 입력하세요." }));
      return;
    }

    if (!/^[a-zA-Z0-9]{4,20}$/.test(username)) {
      setErrors((prev) => ({
        ...prev,
        username: "아이디는 영문과 숫자 4~20자 이내여야 합니다.",
      }));
      return;
    }

    try {
      const exists = await apiCheckUsername(username);
      if (exists) {
        setErrors((prev) => ({
          ...prev,
          username: "이미 사용 중인 아이디입니다.",
        }));
      } else {
        alert("사용 가능한 아이디입니다!");
        setDupChecked(true);
        setErrors((prev) => ({ ...prev, username: "" }));
      }
    } catch (err) {
      alert("중복 확인 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  // ✅ 전체 유효성 검사 (제출 시)
  const validateAll = () => {
    const fields = Object.keys(form);
    fields.forEach((key) => validateField(key, form[key]));
    return Object.values(errors).every((msg) => msg === "");
  };

  // ✅ 회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      await apiRegister(form.username, form.password, form.name);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch {
      alert("회원가입 실패. 다시 시도해주세요.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        border: "1px solid #ddd",
        padding: 30,
        borderRadius: 8,
      }}
    >
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        {/* 아이디 */}
        <div style={{ marginBottom: 15 }}>
          <label>아이디</label>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="영문+숫자 4~20자"
              style={{ flex: 1 }}
            />
            <button type="button" onClick={handleCheck}>
              중복확인
            </button>
          </div>
          {errors.username && (
            <div style={{ color: "red", fontSize: 13 }}>{errors.username}</div>
          )}
        </div>

        {/* 비밀번호 */}
        <div style={{ marginBottom: 15 }}>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="영문+숫자 8~20자"
            style={{ width: "100%" }}
          />
          {errors.password && (
            <div style={{ color: "red", fontSize: 13 }}>{errors.password}</div>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div style={{ marginBottom: 15 }}>
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
          {errors.passwordConfirm && (
            <div style={{ color: "red", fontSize: 13 }}>
              {errors.passwordConfirm}
            </div>
          )}
        </div>

        {/* 이름 */}
        <div style={{ marginBottom: 15 }}>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            style={{ width: "100%" }}
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: 13 }}>{errors.name}</div>
          )}
        </div>

        {/* 제출 */}
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#2563eb",
            color: "white",
            padding: "10px 0",
            border: "none",
            borderRadius: 5,
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
