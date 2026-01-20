'use client';

import { useLanguage } from '@/context/language-provider';

// Define the type for a single language's translations
export type TranslationMessages = {
  // Sidebar
  'Modes': string;
  'Explain Topic': string;
  'Generate Quiz': string;
  'Summarize Text': string;
  'Create a Story': string;
  'Clear Chat': string;
  'Configuration': string;
  'Dark Mode': string;
  'Language': string;
  'Select language': string;
  'App Name': string;

  // Tabs
  'Interactive Prototype': string;
  'System Architecture': string;
  'Tech Specs': string;

  // Chat page
  'Hello! I am your AI Study Buddy. Select a mode on the left and let\'s start learning.': string;
  'Thinking...': string;
  'Error: ': string;
  'Read Aloud': string;
  'Copy': string;
  'Copied to clipboard!': string;
  'Type a topic or concept...': string;
  'AI can make mistakes. Always verify important information.': string;
  'Query must be at least 2 characters.': string;

  // Quiz page
  'Practice Quiz Generator': string;
  'Generate custom quizzes on any subject to reinforce your learning and prepare for exams.': string;
  'Create a Practice Quiz': string;
  'Test your knowledge on any topic.': string;
  'Topic': string;
  'Topic must be at least 2 characters.': string;
  'e.g., The Roman Empire': string;
  'Number of Questions': string;
  'Must have at least 3 questions.': string;
  'Cannot have more than 10 questions.': string;
  'Select number of questions': string;
  'Generate Quiz': string;
  'Generating your quiz...': string;
  'Question {currentQuestionIndex} of {quizLength}': string;
  'Next Question': string;
  'Submit Quiz': string;
  'Quiz Complete!': string;
  'You scored': string;
  'Take Another Quiz': string;
  'Error': string;

  // Story page
  'AI Story Generator': string;
  'Unleash your imagination. Provide a topic, and our AI will weave a unique story for you.': string;
  'Story Topic': string;
  'e.g., A robot who discovers music': string;
  'Generate Story': string;
  'Generating Story...': string;
  'The Story': string;
  'Story Generation Error': string;
  'An error occurred. Please try again.': string;
  'Text-to-Speech Error': string;
  'An error occurred during text-to-speech.': string;
  'Audio Error': string;
  'Could not play audio. Your browser might be blocking it.': string;

  // Summarizer page
  'AI Text Summarizer': string;
  'Paste in any long text, article, or document, and get a quick, easy-to-read summary of the key points.': string;
  'Summarize Your Text': string;
  'Text to Summarize': string;
  'Text must be at least 100 characters to summarize.': string;
  'Paste your text here...': string;
  'Summarize': string;
  'Generating Summary...': string;
  'Summary': string;
};

// Define all translations
const translations: Record<string, Partial<TranslationMessages>> = {
  English: {
    'Modes': 'Modes',
    'Explain Topic': 'Explain Topic',
    'Generate Quiz': 'Generate Quiz',
    'Summarize Text': 'Summarize Text',
    'Create a Story': 'Create a Story',
    'Clear Chat': 'Clear Chat',
    'Configuration': 'Configuration',
    'Dark Mode': 'Dark Mode',
    'Language': 'Language',
    'Select language': 'Select language',
    'App Name': 'ORIoN : AI STUDY BUDDY',
    'Interactive Prototype': 'Interactive Prototype',
    'System Architecture': 'System Architecture',
    'Tech Specs': 'Tech Specs',
    'Hello! I am your AI Study Buddy. Select a mode on the left and let\'s start learning.': 'Hello! I am ORIoN : AI STUDY BUDDY. Select a mode on the left and let\'s start learning.',
    'Thinking...': 'Thinking...',
    'Error: ': 'Error: ',
    'Read Aloud': 'Read Aloud',
    'Copy': 'Copy',
    'Copied to clipboard!': 'Copied to clipboard!',
    'Type a topic or concept...': 'Type a topic or concept...',
    'AI can make mistakes. Always verify important information.': 'AI can make mistakes. Always verify important information.',
    'Query must be at least 2 characters.': 'Query must be at least 2 characters.',
    'Practice Quiz Generator': 'Practice Quiz Generator',
    'Generate custom quizzes on any subject to reinforce your learning and prepare for exams.': 'Generate custom quizzes on any subject to reinforce your learning and prepare for exams.',
    'Create a Practice Quiz': 'Create a Practice Quiz',
    'Test your knowledge on any topic.': 'Test your knowledge on any topic.',
    'Topic': 'Topic',
    'Topic must be at least 2 characters.': 'Topic must be at least 2 characters.',
    'e.g., The Roman Empire': 'e.g., The Roman Empire',
    'Number of Questions': 'Number of Questions',
    'Must have at least 3 questions.': 'Must have at least 3 questions.',
    'Cannot have more than 10 questions.': 'Cannot have more than 10 questions.',
    'Select number of questions': 'Select number of questions',
    'Generate Quiz': 'Generate Quiz',
    'Generating your quiz...': 'Generating your quiz...',
    'Question {currentQuestionIndex} of {quizLength}': 'Question {currentQuestionIndex} of {quizLength}',
    'Next Question': 'Next Question',
    'Submit Quiz': 'Submit Quiz',
    'Quiz Complete!': 'Quiz Complete!',
    'You scored': 'You scored',
    'Take Another Quiz': 'Take Another Quiz',
    'Error': 'Error',
    'AI Story Generator': 'AI Story Generator',
    'Unleash your imagination. Provide a topic, and our AI will weave a unique story for you.': 'Unleash your imagination. Provide a topic, and our AI will weave a unique story for you.',
    'Create a Story': 'Create a Story',
    'Story Topic': 'Story Topic',
    'e.g., A robot who discovers music': 'e.g., A robot who discovers music',
    'Generate Story': 'Generate Story',
    'Generating Story...': 'Generating Story...',
    'The Story': 'The Story',
    'Story Generation Error': 'Story Generation Error',
    'An error occurred. Please try again.': 'An error occurred. Please try again.',
    'Text-to-Speech Error': 'Text-to-Speech Error',
    'An error occurred during text-to-speech.': 'An error occurred during text-to-speech.',
    'Audio Error': 'Audio Error',
    'Could not play audio. Your browser might be blocking it.': 'Could not play audio. Your browser might be blocking it.',
    'AI Text Summarizer': 'AI Text Summarizer',
    'Paste in any long text, article, or document, and get a quick, easy-to-read summary of the key points.': 'Paste in any long text, article, or document, and get a quick, easy-to-read summary of the key points.',
    'Summarize Your Text': 'Summarize Your Text',
    'Text to Summarize': 'Text to Summarize',
    'Text must be at least 100 characters to summarize.': 'Text must be at least 100 characters to summarize.',
    'Paste your text here...': 'Paste your text here...',
    'Summarize': 'Summarize',
    'Generating Summary...': 'Generating Summary...',
    'Summary': 'Summary',
  },
  Spanish: {
    'Modes': 'Modos',
    'Explain Topic': 'Explicar Tema',
    'Generate Quiz': 'Generar Cuestionario',
    'Summarize Text': 'Resumir Texto',
    'Create a Story': 'Crear una Historia',
    'Clear Chat': 'Limpiar Chat',
    'Configuration': 'Configuración',
    'Dark Mode': 'Modo Oscuro',
    'Language': 'Idioma',
    'Select language': 'Seleccionar idioma',
    'App Name': 'ORIoN : COMPAÑERO DE ESTUDIO IA',
    'Interactive Prototype': 'Prototipo Interactivo',
    'System Architecture': 'Arquitectura del Sistema',
    'Tech Specs': 'Especificaciones Técnicas',
    'Hello! I am your AI Study Buddy. Select a mode on the left and let\'s start learning.': '¡Hola! Soy ORIoN : COMPAÑERO DE ESTUDIO IA. Selecciona un modo a la izquierda y empecemos a aprender.',
    'Thinking...': 'Pensando...',
    'Error: ': 'Error: ',
    'Read Aloud': 'Leer en voz alta',
    'Copy': 'Copiar',
    'Copied to clipboard!': '¡Copiado al portapapeles!',
    'Type a topic or concept...': 'Escribe un tema o concepto...',
    'AI can make mistakes. Always verify important information.': 'La IA puede cometer errores. Verifica siempre la información importante.',
    'Query must be at least 2 characters.': 'La consulta debe tener al menos 2 caracteres.',
    'Practice Quiz Generator': 'Generador de Cuestionarios de Práctica',
    'Generate custom quizzes on any subject to reinforce your learning and prepare for exams.': 'Genera cuestionarios personalizados sobre cualquier tema para reforzar tu aprendizaje y prepararte para los exámenes.',
    'Create a Practice Quiz': 'Crear un Cuestionario de Práctica',
    'Test your knowledge on any topic.': 'Pon a prueba tus conocimientos sobre cualquier tema.',
    'Topic': 'Tema',
    'Topic must be at least 2 characters.': 'El tema debe tener al menos 2 caracteres.',
    'e.g., The Roman Empire': 'p. ej., El Imperio Romano',
    'Number of Questions': 'Número de Preguntas',
    'Must have at least 3 questions.': 'Debe tener al menos 3 preguntas.',
    'Cannot have more than 10 questions.': 'No puede tener más de 10 preguntas.',
    'Select number of questions': 'Selecciona el número de preguntas',
    'Generate Quiz': 'Generar Cuestionario',
    'Generating your quiz...': 'Generando tu cuestionario...',
    'Question {currentQuestionIndex} of {quizLength}': 'Pregunta {currentQuestionIndex} de {quizLength}',
    'Next Question': 'Siguiente Pregunta',
    'Submit Quiz': 'Enviar Cuestionario',
    'Quiz Complete!': '¡Cuestionario Completo!',
    'You scored': 'Obtuviste',
    'Take Another Quiz': 'Hacer Otro Cuestionario',
    'Error': 'Error',
    'AI Story Generator': 'Generador de Historias con IA',
    'Unleash your imagination. Provide a topic, and our AI will weave a unique story for you.': 'Da rienda suelta a tu imaginación. Proporciona un tema y nuestra IA tejerá una historia única para ti.',
    'Create a Story': 'Crear una Historia',
    'Story Topic': 'Tema de la Historia',
    'e.g., A robot who discovers music': 'p. ej., Un robot que descubre la música',
    'Generate Story': 'Generar Historia',
    'Generating Story...': 'Generando historia...',
    'The Story': 'La Historia',
    'Story Generation Error': 'Error en la Generación de la Historia',
    'An error occurred. Please try again.': 'Ocurrió un error. Por favor, inténtalo de nuevo.',
    'Text-to-Speech Error': 'Error de Texto a Voz',
    'An error occurred during text-to-speech.': 'Ocurrió un error durante la conversión de texto a voz.',
    'Audio Error': 'Error de Audio',
    'Could not play audio. Your browser might be blocking it.': 'No se pudo reproducir el audio. Tu navegador podría estar bloqueándolo.',
    'AI Text Summarizer': 'Resumidor de Texto con IA',
    'Paste in any long text, article, or document, and get a quick, easy-to-read summary of the key points.': 'Pega cualquier texto largo, artículo o documento y obtén un resumen rápido y fácil de leer de los puntos clave.',
    'Summarize Your Text': 'Resume Tu Texto',
    'Text to Summarize': 'Texto a Resumir',
    'Text must be at least 100 characters to summarize.': 'El texto debe tener al menos 100 caracteres para ser resumido.',
    'Paste your text here...': 'Pega tu texto aquí...',
    'Summarize': 'Resumir',
    'Generating Summary...': 'Generando resumen...',
    'Summary': 'Resumen',
  },
  French: {},
  German: {},
  Japanese: {},
  Hindi: {},
  Odia: {},
  Tamil: {},
  Telugu: {},
};


export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: keyof TranslationMessages, replacements?: Record<string, string | number>) => {
    const langTranslations = translations[language] || translations.English;
    let text = (langTranslations as TranslationMessages)[key] || (translations.English as TranslationMessages)[key];

    if (text && replacements) {
      Object.keys(replacements).forEach((rKey) => {
        text = text!.replace(`{${rKey}}`, String(replacements[rKey]));
      });
    }

    return text || key;
  };

  return { t, language };
};
