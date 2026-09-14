const fs = require('fs');
let content = fs.readFileSync('src/pages/Aula.tsx', 'utf8');

// Replace standard react-router imports to add useLocation
content = content.replace(
  "import { useParams, useNavigate } from 'react-router-dom';",
  "import { useParams, useNavigate, useLocation } from 'react-router-dom';"
);

// Add location hook inside Aula component
content = content.replace(
  "  const navigate = useNavigate();",
  "  const navigate = useNavigate();\n  const location = useLocation();\n  const searchParams = new URLSearchParams(location.search);\n  const lessonParam = searchParams.get('lesson');"
);

// Modify the useEffect that sets default lesson
content = content.replace(
  "  useEffect(() => {\n    if (currentLessons.length > 0) {\n      setActiveLessonId(currentLessons[0].id);\n    } else {\n      setActiveLessonId(null);\n    }\n  }, [activeModule]);",
  "  useEffect(() => {\n    if (lessonParam) {\n      setActiveLessonId(Number(lessonParam));\n    } else if (currentLessons.length > 0) {\n      setActiveLessonId(currentLessons[0].id);\n    } else {\n      setActiveLessonId(null);\n    }\n  }, [activeModule, lessonParam]);"
);

fs.writeFileSync('src/pages/Aula.tsx', content);
