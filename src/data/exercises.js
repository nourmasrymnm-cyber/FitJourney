// Exercise library (home, bodyweight only). Each exercise has Arabic + English text.
// level: 1 beginner, 2 intermediate, 3 advanced.
// mode: 'reps' | 'time' (amount = reps or seconds). avoid = limitation tags that exclude it.
export const GROUPS = [
  'warmup', 'chest', 'shoulders', 'back', 'biceps', 'triceps',
  'core', 'legs', 'glutes', 'full', 'cardio', 'stretch',
];

export const GROUP_EMOJI = {
  warmup: '🔥', chest: '💪', shoulders: '🙆', back: '🧗', biceps: '💪', triceps: '🦾',
  core: '🎯', legs: '🦵', glutes: '🦿', full: '⚡', cardio: '❤️', stretch: '🧘',
};

export const EXERCISES = [];
const add = (id, group, level, mode, sets, amount, rest, avoid, muscles, ar, en, flags = {}) =>
  EXERCISES.push({ id, group, level, mode, sets, amount, rest, avoid, muscles, ar, en, ...flags });

/* ---------- Warm-up ---------- */
add('arm-circles', 'warmup', 1, 'time', 1, 30, 0, ['shoulder'], ['shoulders'],
  { name: 'دوائر الذراعين', desc: 'تسخين لمفاصل الكتفين قبل التمرين.',
    steps: ['قف باعتدال وافتح ذراعيك جانباً.', 'ارسم دوائر صغيرة ثم أكبر تدريجياً.', 'بدّل الاتجاه في منتصف الوقت.'],
    mistakes: ['رفع الكتفين نحو الأذنين.', 'الحركة السريعة العشوائية.'], breath: 'تنفس بشكل طبيعي ومنتظم.' },
  { name: 'Arm circles', desc: 'Warms up the shoulder joints before training.',
    steps: ['Stand tall with arms out to the sides.', 'Draw small circles, then gradually bigger ones.', 'Switch direction halfway through.'],
    mistakes: ['Shrugging shoulders toward the ears.', 'Swinging fast and sloppy.'], breath: 'Breathe normally and steadily.' });

add('march-in-place', 'warmup', 1, 'time', 1, 40, 0, [], ['heart', 'hips'],
  { name: 'المشي في المكان', desc: 'رفع تدريجي لنبض القلب وحرارة الجسم.',
    steps: ['قف باعتدال وارفع ركبتيك بالتناوب.', 'حرّك ذراعيك بشكل طبيعي.', 'زد الإيقاع تدريجياً دون قفز.'],
    mistakes: ['الانحناء إلى الأمام.', 'الدوس بقوة على الأرض.'], breath: 'تنفس بإيقاع مريح.' },
  { name: 'March in place', desc: 'Gradually raises heart rate and body temperature.',
    steps: ['Stand tall and lift your knees one at a time.', 'Swing your arms naturally.', 'Build the pace gradually without jumping.'],
    mistakes: ['Leaning forward.', 'Stomping hard on the floor.'], breath: 'Breathe at a comfortable rhythm.' });

add('cat-cow', 'warmup', 1, 'time', 1, 40, 0, ['wrist', 'knee'], ['lowerBack', 'abs'],
  { name: 'القطة والبقرة', desc: 'حركة لطيفة لتحريك العمود الفقري.',
    steps: ['على اليدين والركبتين والظهر مستقيم.', 'ازفر وقوّس ظهرك للأعلى مع خفض الرأس.', 'استنشق وأنزل البطن وارفع النظر قليلاً.'],
    mistakes: ['الحركة الحادة أو السريعة.', 'تحميل الرسغين أكثر من اللازم.'], breath: 'ازفر عند التقويس واستنشق عند النزول.' },
  { name: 'Cat-cow', desc: 'A gentle movement to mobilize the spine.',
    steps: ['On hands and knees with a flat back.', 'Exhale, round your back up and lower your head.', 'Inhale, drop your belly and lift your gaze slightly.'],
    mistakes: ['Sharp or fast movement.', 'Putting too much weight on the wrists.'], breath: 'Exhale as you round, inhale as you drop.' });

/* ---------- Stretch ---------- */
add('child-pose', 'stretch', 1, 'time', 1, 30, 0, ['knee'], ['lowerBack', 'hips'],
  { name: 'وضعية الطفل', desc: 'إطالة لطيفة للظهر والوركين.',
    steps: ['اجلس على كعبيك وركبتاك متباعدتان قليلاً.', 'مدّ ذراعيك للأمام وأرح جبهتك على الأرض.', 'ابقَ مسترخياً وتنفس ببطء.'],
    mistakes: ['إجبار الجسم على الهبوط.', 'حبس النفس.'], breath: 'تنفس عميقاً وببطء.' },
  { name: "Child's pose", desc: 'A gentle stretch for the back and hips.',
    steps: ['Sit back on your heels with knees slightly apart.', 'Reach your arms forward and rest your forehead down.', 'Stay relaxed and breathe slowly.'],
    mistakes: ['Forcing the body down.', 'Holding your breath.'], breath: 'Breathe deeply and slowly.' });

add('standing-hamstring', 'stretch', 1, 'time', 1, 30, 0, ['back'], ['hamstrings'],
  { name: 'إطالة الفخذ الخلفي', desc: 'إطالة لعضلات الفخذ الخلفية، 15 ثانية لكل ساق.',
    steps: ['قف وضع كعب إحدى القدمين أمامك قليلاً.', 'انحنِ من الورك بظهر مستقيم حتى تشعر بشد خفيف.', 'ثبّت 15 ثانية ثم بدّل الساق.'],
    mistakes: ['تقويس الظهر.', 'الشد حتى الألم.'], breath: 'ازفر ببطء أثناء الانحناء.' },
  { name: 'Standing hamstring stretch', desc: 'Stretches the back of the thigh, 15 seconds per leg.',
    steps: ['Stand and place one heel slightly forward.', 'Hinge at the hips with a straight back until you feel a mild stretch.', 'Hold 15 seconds, then switch legs.'],
    mistakes: ['Rounding the back.', 'Stretching into pain.'], breath: 'Exhale slowly as you lean forward.' });

/* ---------- Chest ---------- */
add('wall-pushup', 'chest', 1, 'reps', 2, 12, 60, ['shoulder'], ['chest', 'triceps', 'shoulders'],
  { name: 'ضغط على الحائط', desc: 'نسخة خفيفة من الضغط مناسبة للبداية.',
    steps: ['قف أمام الحائط بمسافة ذراع وضع كفيك على مستوى الصدر.', 'ثنِ مرفقيك وقرّب صدرك من الحائط ببطء.', 'ادفع بقوة لتعود إلى البداية.'],
    mistakes: ['ترك الورك يتقدم عن الجسم.', 'فتح المرفقين بزاوية واسعة جداً.'], breath: 'استنشق أثناء النزول وازفر أثناء الدفع.',
    easier: 'قرّب قدميك من الحائط.', harder: 'ابتعد بقدميك عن الحائط أكثر، ثم انتقل إلى الضغط على الركبتين.' },
  { name: 'Wall push-up', desc: 'A light push-up version suited to beginners.',
    steps: ['Stand an arm\'s length from the wall, hands at chest height.', 'Bend your elbows and bring your chest toward the wall slowly.', 'Push firmly back to the start.'],
    mistakes: ['Letting the hips drift ahead of the body.', 'Flaring the elbows too wide.'], breath: 'Inhale going down, exhale pushing up.',
    easier: 'Step your feet closer to the wall.', harder: 'Step further from the wall, then move to knee push-ups.' });

add('knee-pushup', 'chest', 1, 'reps', 2, 8, 75, ['wrist', 'shoulder', 'knee'], ['chest', 'triceps', 'shoulders', 'abs'],
  { name: 'ضغط على الركبتين', desc: 'خطوة وسطية بين الحائط والضغط الكامل.',
    steps: ['ضع يديك أسفل الكتفين والركبتين على الأرض (يفضّل فوق سجادة).', 'اجعل جسمك خطاً مستقيماً من الرأس إلى الركبتين.', 'انزل بصدرك نحو الأرض ثم ادفع للأعلى.'],
    mistakes: ['تقوّس أسفل الظهر.', 'النزول بنصف المدى فقط.'], breath: 'استنشق أثناء النزول وازفر أثناء الدفع.',
    easier: 'عد إلى الضغط على الحائط.', harder: 'جرّب الضغط الكامل على القدمين.' },
  { name: 'Knee push-up', desc: 'A middle step between wall and full push-ups.',
    steps: ['Hands under shoulders, knees on the floor (a mat helps).', 'Keep a straight line from head to knees.', 'Lower your chest toward the floor, then push up.'],
    mistakes: ['Arching the lower back.', 'Only going halfway down.'], breath: 'Inhale going down, exhale pushing up.',
    easier: 'Go back to wall push-ups.', harder: 'Try the full push-up on your toes.' });

add('pushup', 'chest', 2, 'reps', 3, 10, 75, ['wrist', 'shoulder'], ['chest', 'triceps', 'shoulders', 'abs'],
  { name: 'ضغط كلاسيكي', desc: 'تمرين أساسي لعضلات الصدر والذراعين.',
    steps: ['ضع يديك أسفل الكتفين وجسمك مستقيم كلوح.', 'انزل حتى يقترب صدرك من الأرض مع مرفقين قريبين من الجسم.', 'ادفع للأعلى دون قفل المرفقين بقوة.'],
    mistakes: ['انخفاض الورك أو ارتفاعه.', 'دفع الرقبة للأمام.'], breath: 'استنشق أثناء النزول وازفر أثناء الدفع.',
    easier: 'ضغط على الركبتين.', harder: 'نزول بطيء لمدة 3 ثوانٍ.' },
  { name: 'Push-up', desc: 'A core exercise for chest and arms.',
    steps: ['Hands under shoulders, body straight like a plank.', 'Lower until your chest nears the floor, elbows close to the body.', 'Push up without locking the elbows hard.'],
    mistakes: ['Sagging or raising the hips.', 'Pushing the neck forward.'], breath: 'Inhale going down, exhale pushing up.',
    easier: 'Knee push-ups.', harder: 'Lower slowly for 3 seconds.' });

add('slow-pushup', 'chest', 3, 'reps', 3, 8, 90, ['wrist', 'shoulder'], ['chest', 'triceps', 'shoulders', 'abs'],
  { name: 'ضغط بطيء', desc: 'ضغط بنزول بطيء لزيادة الصعوبة دون زيادة التكرارات.',
    steps: ['خذ وضع الضغط الكامل.', 'انزل خلال 3 ثوانٍ.', 'توقف ثانية قرب الأرض ثم ادفع بقوة.'],
    mistakes: ['فقدان استقامة الجسم عند التعب.', 'التسرع في النزول.'], breath: 'استنشق أثناء النزول وازفر أثناء الدفع.',
    easier: 'الضغط الكلاسيكي.', harder: 'أطل النزول إلى 4 ثوانٍ.' },
  { name: 'Slow push-up', desc: 'A slow-lowering push-up that adds difficulty without more reps.',
    steps: ['Take the full push-up position.', 'Lower over 3 seconds.', 'Pause a second near the floor, then push up hard.'],
    mistakes: ['Losing body alignment when tired.', 'Rushing the lowering phase.'], breath: 'Inhale going down, exhale pushing up.',
    easier: 'Standard push-up.', harder: 'Lengthen the lowering to 4 seconds.' });

/* ---------- Shoulders ---------- */
add('wall-angel', 'shoulders', 1, 'reps', 2, 10, 45, ['shoulder'], ['shoulders', 'upperBack'],
  { name: 'ملاك الحائط', desc: 'تقوية وتحريك الكتفين والظهر العلوي.',
    steps: ['قف وظهرك ورأسك ملاصقان للحائط وقدماك أمامه قليلاً.', 'ارفع ذراعيك بشكل حرف W ملامسين الحائط قدر الإمكان.', 'ارفعهما للأعلى ثم أنزلهما ببطء.'],
    mistakes: ['ابتعاد أسفل الظهر عن الحائط بشكل مبالغ.', 'رفع الكتفين.'], breath: 'تنفس بهدوء مع الحركة.',
    easier: 'قلل مدى الحركة.', harder: 'أبطئ الحركة وثبّت ثانيتين في الأعلى.' },
  { name: 'Wall angel', desc: 'Strengthens and mobilizes the shoulders and upper back.',
    steps: ['Stand with back and head against the wall, feet slightly forward.', 'Raise your arms in a W shape, touching the wall as much as possible.', 'Slide them up, then lower slowly.'],
    mistakes: ['Excessively arching the lower back off the wall.', 'Shrugging the shoulders.'], breath: 'Breathe calmly with the movement.',
    easier: 'Use a smaller range of motion.', harder: 'Slow down and hold 2 seconds at the top.' });

add('pike-pushup', 'shoulders', 3, 'reps', 3, 8, 90, ['wrist', 'shoulder', 'back'], ['shoulders', 'triceps', 'upperBack'],
  { name: 'ضغط الكتف (بايك)', desc: 'ضغط بزاوية يركز على الكتفين.',
    steps: ['ابدأ من وضع الضغط ثم ارفع الورك لشكل حرف V مقلوب.', 'ثنِ مرفقيك ودع رأسك ينزل نحو الأرض بين يديك.', 'ادفع للأعلى لتعود إلى شكل V.'],
    mistakes: ['فتح المرفقين جانباً.', 'تحميل الرقبة بدل الكتفين.'], breath: 'استنشق أثناء النزول وازفر أثناء الدفع.',
    easier: 'قلّل مدى النزول.', harder: 'قرّب قدميك من يديك.' },
  { name: 'Pike push-up', desc: 'An angled push-up that targets the shoulders.',
    steps: ['Start in push-up position, then raise the hips into an inverted V.', 'Bend your elbows and lower your head toward the floor between your hands.', 'Push back up to the V shape.'],
    mistakes: ['Flaring the elbows out.', 'Loading the neck instead of the shoulders.'], breath: 'Inhale going down, exhale pushing up.',
    easier: 'Use a smaller range of motion.', harder: 'Walk your feet closer to your hands.' },
  { intense: true });

/* ---------- Back ---------- */
add('superman', 'back', 1, 'reps', 2, 10, 45, ['back'], ['lowerBack', 'glutes', 'upperBack'],
  { name: 'تمرين سوبرمان', desc: 'تقوية أسفل الظهر والأرداف.',
    steps: ['استلقِ على بطنك وذراعاك ممدودتان للأمام.', 'ارفع ذراعيك وساقيك عن الأرض قليلاً.', 'ثبّت ثانيتين ثم انزل ببطء.'],
    mistakes: ['رفع الرقبة للأعلى.', 'الارتفاع الزائد بأسفل الظهر.'], breath: 'ازفر عند الرفع واستنشق عند النزول.',
    easier: 'ارفع الذراعين فقط أو الساقين فقط.', harder: 'ثبّت 4 ثوانٍ في الأعلى.' },
  { name: 'Superman', desc: 'Strengthens the lower back and glutes.',
    steps: ['Lie face down with arms extended forward.', 'Lift your arms and legs slightly off the floor.', 'Hold 2 seconds, then lower slowly.'],
    mistakes: ['Craning the neck up.', 'Over-lifting with the lower back.'], breath: 'Exhale lifting, inhale lowering.',
    easier: 'Lift only the arms or only the legs.', harder: 'Hold 4 seconds at the top.' });

add('bird-dog', 'back', 1, 'reps', 2, 8, 45, ['wrist', 'knee'], ['lowerBack', 'glutes', 'abs'],
  { name: 'الكلب والطائر', desc: 'تمرين ثبات للظهر والجذع، لكل جانب.',
    steps: ['على اليدين والركبتين والظهر مستوٍ.', 'مدّ ذراعاً أمامك والساق المعاكسة للخلف.', 'ثبّت ثانيتين ثم بدّل الجانب.'],
    mistakes: ['ميلان الورك للجانب.', 'رفع الساق أعلى من مستوى الظهر.'], breath: 'تنفس بانتظام ولا تحبس النفس.',
    easier: 'مدّ الساق فقط.', harder: 'قرّب المرفق من الركبة تحت الجسم قبل المد.' },
  { name: 'Bird-dog', desc: 'A stability exercise for the back and trunk, per side.',
    steps: ['On hands and knees with a flat back.', 'Extend one arm forward and the opposite leg back.', 'Hold 2 seconds, then switch sides.'],
    mistakes: ['Letting the hips tilt sideways.', 'Raising the leg above back level.'], breath: 'Breathe steadily, do not hold your breath.',
    easier: 'Extend only the leg.', harder: 'Touch elbow to knee under the body before extending.' });

/* ---------- Biceps ---------- */
add('self-resisted-curl', 'biceps', 1, 'reps', 2, 10, 45, [], ['biceps'],
  { name: 'ثني الذراع بمقاومة اليد', desc: 'تمرين للعضلة ذات الرأسين بمقاومة ذراعك الأخرى، لكل ذراع.',
    steps: ['قف باعتدال ومرفقك بجانب جسمك وكف يدك للأعلى.', 'ضع يدك الأخرى فوق المعصم لتكون مقاومة.', 'اثنِ الذراع نحو الكتف ببطء مع المقاومة ثم انزل ببطء.'],
    mistakes: ['مقاومة مفرطة تفقدك التحكم.', 'ميلان الجذع.'], breath: 'ازفر عند الثني واستنشق عند النزول.',
    easier: 'خفف المقاومة.', harder: 'أبطئ الحركة إلى 4 ثوانٍ لكل اتجاه.' },
  { name: 'Self-resisted curl', desc: 'A biceps exercise using your other arm as resistance, per arm.',
    steps: ['Stand tall, elbow at your side, palm facing up.', 'Place your other hand on the wrist as resistance.', 'Curl toward the shoulder slowly against the resistance, then lower slowly.'],
    mistakes: ['Too much resistance, losing control.', 'Swaying the torso.'], breath: 'Exhale curling, inhale lowering.',
    easier: 'Use less resistance.', harder: 'Slow to 4 seconds each way.' });

/* ---------- Triceps ---------- */
add('wall-triceps-press', 'triceps', 1, 'reps', 2, 12, 45, ['shoulder'], ['triceps'],
  { name: 'ضغط الترايسبس على الحائط', desc: 'تمرين خفيف لعضلة الذراع الخلفية.',
    steps: ['قف أمام الحائط وضع كفيك قريبين بعرض الكتفين أو أقل.', 'ثنِ المرفقين مع إبقائهما قريبين من الجسم.', 'ادفع حتى تفرد ذراعيك.'],
    mistakes: ['فتح المرفقين.', 'تقدّم الورك.'], breath: 'استنشق أثناء الثني وازفر أثناء الدفع.',
    easier: 'قف أقرب إلى الحائط.', harder: 'ابتعد بقدميك للخلف.' },
  { name: 'Wall triceps press', desc: 'A light exercise for the back of the arms.',
    steps: ['Face the wall, hands shoulder-width or closer.', 'Bend the elbows, keeping them close to the body.', 'Push until your arms are straight.'],
    mistakes: ['Flaring the elbows.', 'Pushing the hips forward.'], breath: 'Inhale bending, exhale pressing.',
    easier: 'Stand closer to the wall.', harder: 'Step your feet further back.' });

add('close-pushup', 'triceps', 2, 'reps', 3, 8, 75, ['wrist', 'shoulder'], ['triceps', 'chest', 'shoulders'],
  { name: 'ضغط ضيق', desc: 'ضغط بيدين متقاربتين لتركيز العمل على الذراع الخلفية.',
    steps: ['خذ وضع الضغط بيدين أضيق من عرض الكتفين.', 'انزل مع إبقاء المرفقين ملاصقين للجسم.', 'ادفع للأعلى بقوة.'],
    mistakes: ['فتح المرفقين.', 'تقوّس الظهر.'], breath: 'استنشق أثناء النزول وازفر أثناء الدفع.',
    easier: 'نفّذه على الركبتين.', harder: 'نزول بطيء 3 ثوانٍ.' },
  { name: 'Close-grip push-up', desc: 'A push-up with narrow hands to emphasize the triceps.',
    steps: ['Take push-up position with hands narrower than shoulder width.', 'Lower with elbows tight to the body.', 'Press up firmly.'],
    mistakes: ['Flaring the elbows.', 'Arching the back.'], breath: 'Inhale going down, exhale pushing up.',
    easier: 'Do it on your knees.', harder: 'Lower slowly for 3 seconds.' });

/* ---------- Core ---------- */
add('dead-bug', 'core', 1, 'reps', 2, 8, 45, [], ['abs'],
  { name: 'الخنفساء الميتة', desc: 'تمرين آمن لتقوية عضلات البطن العميقة، لكل جانب.',
    steps: ['استلقِ على ظهرك وارفع الذراعين للأعلى والركبتين بزاوية 90 درجة.', 'أنزل ذراعاً والساق المعاكسة ببطء نحو الأرض دون أن يترك ظهرك الأرض.', 'عد للبداية وبدّل الجانب.'],
    mistakes: ['ارتفاع أسفل الظهر عن الأرض.', 'الحركة السريعة.'], breath: 'ازفر أثناء مد الذراع والساق.',
    easier: 'حرّك الساق فقط.', harder: 'أطل مدى الحركة وأبطئ.' },
  { name: 'Dead bug', desc: 'A safe exercise for the deep abdominal muscles, per side.',
    steps: ['Lie on your back, arms up and knees bent at 90 degrees.', 'Lower one arm and the opposite leg slowly without your back leaving the floor.', 'Return and switch sides.'],
    mistakes: ['Lower back lifting off the floor.', 'Moving too fast.'], breath: 'Exhale as you extend arm and leg.',
    easier: 'Move only the legs.', harder: 'Lengthen the range and slow down.' });

add('plank', 'core', 1, 'time', 2, 20, 45, ['shoulder', 'back'], ['abs', 'shoulders'],
  { name: 'البلانك', desc: 'تثبيت للجذع على الساعدين.',
    steps: ['ضع ساعديك على الأرض ومرفقاك تحت الكتفين.', 'ارفع جسمك على أصابع القدمين بخط مستقيم.', 'شدّ بطنك وثبّت دون تقويس الظهر.'],
    mistakes: ['هبوط الورك.', 'رفع الورك عالياً.'], breath: 'تنفس بانتظام ولا تحبس النفس.',
    easier: 'ارتكز على الركبتين.', harder: 'زد المدة 5 ثوانٍ كل أسبوع.' },
  { name: 'Plank', desc: 'A trunk hold on the forearms.',
    steps: ['Forearms on the floor, elbows under shoulders.', 'Lift your body onto your toes in a straight line.', 'Brace your abs and hold without arching the back.'],
    mistakes: ['Sagging hips.', 'Piking the hips up.'], breath: 'Breathe steadily, do not hold your breath.',
    easier: 'Rest on your knees.', harder: 'Add 5 seconds each week.' });

add('bicycle-crunch', 'core', 2, 'reps', 3, 12, 45, ['back'], ['abs', 'obliques'],
  { name: 'الدراجة الهوائية', desc: 'تمرين لعضلات البطن والجانبين، لكل جانب.',
    steps: ['استلقِ ويداك خلف الرأس برفق وارفع الساقين قليلاً.', 'قرّب المرفق من الركبة المعاكسة مع فرد الساق الأخرى.', 'بدّل الجانب بإيقاع هادئ.'],
    mistakes: ['شد الرقبة بالأيدي.', 'السرعة على حساب التحكم.'], breath: 'ازفر عند كل التفاف.',
    easier: 'اترك قدميك على الأرض.', harder: 'أبطئ الإيقاع وثبّت لحظة عند كل جانب.' },
  { name: 'Bicycle crunch', desc: 'Works the abs and obliques, per side.',
    steps: ['Lie back with hands lightly behind your head, legs slightly raised.', 'Bring one elbow toward the opposite knee while extending the other leg.', 'Switch sides at a calm rhythm.'],
    mistakes: ['Pulling the neck with the hands.', 'Speed over control.'], breath: 'Exhale on each twist.',
    easier: 'Keep your feet on the floor.', harder: 'Slow down and pause at each side.' });

add('side-plank', 'core', 2, 'time', 2, 20, 45, ['wrist', 'shoulder'], ['obliques', 'abs', 'shoulders'],
  { name: 'البلانك الجانبي', desc: 'تثبيت جانبي للجذع، 20 ثانية لكل جانب.',
    steps: ['استلقِ على جانبك وارتكز على الساعد والمرفق تحت الكتف.', 'ارفع الورك حتى يصبح جسمك خطاً مستقيماً.', 'ثبّت ثم بدّل الجانب.'],
    mistakes: ['هبوط الورك.', 'ميلان الجسم للأمام أو الخلف.'], breath: 'تنفس بانتظام.',
    easier: 'ارتكز على الركبتين.', harder: 'ارفع الذراع الحرة للأعلى.' },
  { name: 'Side plank', desc: 'A side trunk hold, 20 seconds per side.',
    steps: ['Lie on your side, propped on forearm with elbow under shoulder.', 'Lift your hips into a straight line.', 'Hold, then switch sides.'],
    mistakes: ['Sagging hips.', 'Rolling forward or backward.'], breath: 'Breathe steadily.',
    easier: 'Rest on your knees.', harder: 'Raise the free arm overhead.' });

/* ---------- Legs ---------- */
add('squat', 'legs', 1, 'reps', 2, 12, 60, ['knee'], ['quads', 'glutes', 'hamstrings'],
  { name: 'القرفصاء', desc: 'التمرين الأساسي لعضلات الفخذين والأرداف.',
    steps: ['قف وقدماك بعرض الكتفين وأصابعك للخارج قليلاً.', 'ادفع الورك للخلف وانزل كأنك تجلس على كرسي.', 'ادفع الأرض بقدميك لتعود للوقوف.'],
    mistakes: ['انحناء الركبتين للداخل.', 'رفع الكعبين عن الأرض.'], breath: 'استنشق أثناء النزول وازفر عند الصعود.',
    easier: 'انزل نصف المدى أو اسند يدك على الحائط.', harder: 'أبطئ النزول إلى 3 ثوانٍ.',
    safety: 'إذا شعرت بألم حاد في الركبة فتوقف.' },
  { name: 'Squat', desc: 'The foundation exercise for thighs and glutes.',
    steps: ['Stand feet shoulder-width apart, toes slightly out.', 'Push hips back and lower as if sitting on a chair.', 'Drive through your feet to stand.'],
    mistakes: ['Knees caving inward.', 'Heels lifting off the floor.'], breath: 'Inhale going down, exhale coming up.',
    easier: 'Go half depth or rest a hand on the wall.', harder: 'Lower slowly over 3 seconds.',
    safety: 'Stop if you feel sharp knee pain.' });

add('wall-sit', 'legs', 1, 'time', 2, 20, 60, ['knee'], ['quads', 'glutes'],
  { name: 'الجلوس على الحائط', desc: 'تثبيت ثابت لعضلات الفخذ.',
    steps: ['اسند ظهرك على الحائط وانزلق للأسفل.', 'اجعل ركبتيك فوق الكاحلين بزاوية قريبة من 90 درجة.', 'ثبّت وتنفس.'],
    mistakes: ['تقدّم الركبتين بعد أصابع القدم.', 'وضع اليدين على الفخذين.'], breath: 'تنفس بانتظام.',
    easier: 'انزل أقل.', harder: 'زد المدة 5 ثوانٍ.' },
  { name: 'Wall sit', desc: 'A static hold for the thigh muscles.',
    steps: ['Lean your back on the wall and slide down.', 'Keep knees above ankles at about 90 degrees.', 'Hold and breathe.'],
    mistakes: ['Knees travelling past the toes.', 'Pressing hands on the thighs.'], breath: 'Breathe steadily.',
    easier: 'Sit higher.', harder: 'Add 5 seconds.' });

add('calf-raise', 'legs', 1, 'reps', 2, 15, 45, [], ['calves'],
  { name: 'رفع الكعبين', desc: 'تقوية عضلات الساقين.',
    steps: ['قف واستند بيدك للحائط إن احتجت.', 'ارفع كعبيك عالياً قدر الإمكان.', 'انزل ببطء.'],
    mistakes: ['الحركة السريعة.', 'انحراف الكاحلين للخارج.'], breath: 'ازفر عند الرفع.',
    easier: 'استند للحائط.', harder: 'نفّذ على قدم واحدة.' },
  { name: 'Calf raise', desc: 'Strengthens the lower legs.',
    steps: ['Stand, resting a hand on the wall if needed.', 'Raise your heels as high as you can.', 'Lower slowly.'],
    mistakes: ['Moving too fast.', 'Ankles rolling outward.'], breath: 'Exhale as you rise.',
    easier: 'Hold the wall for support.', harder: 'Do it on one leg.' });

add('reverse-lunge', 'legs', 2, 'reps', 3, 8, 60, ['knee'], ['quads', 'glutes', 'hamstrings'],
  { name: 'الطعنة الخلفية', desc: 'تمرين لكل ساق على حدة لقوة الفخذين والأرداف.',
    steps: ['قف باعتدال وخذ خطوة واسعة للخلف بإحدى القدمين.', 'انزل حتى تقترب الركبة الخلفية من الأرض.', 'ادفع بالقدم الأمامية للعودة وبدّل الساق.'],
    mistakes: ['ميل الجذع للأمام كثيراً.', 'خطوة قصيرة جداً.'], breath: 'استنشق أثناء النزول وازفر عند الصعود.',
    easier: 'استند بيدك للحائط.', harder: 'أبطئ النزول إلى 3 ثوانٍ.' },
  { name: 'Reverse lunge', desc: 'A single-leg exercise for thigh and glute strength.',
    steps: ['Stand tall and step one foot far back.', 'Lower until the back knee nears the floor.', 'Push through the front foot to return and switch legs.'],
    mistakes: ['Leaning the torso too far forward.', 'Taking too short a step.'], breath: 'Inhale going down, exhale coming up.',
    easier: 'Rest a hand on the wall.', harder: 'Lower slowly over 3 seconds.' });

/* ---------- Glutes ---------- */
add('glute-bridge', 'glutes', 1, 'reps', 2, 12, 45, [], ['glutes', 'hamstrings'],
  { name: 'جسر الأرداف', desc: 'تمرين فعال وآمن لعضلات الأرداف.',
    steps: ['استلقِ على ظهرك وثنِ ركبتيك وقدماك على الأرض.', 'ارفع الورك حتى يصبح جسمك خطاً من الكتف للركبة.', 'اعصر الأرداف ثانية ثم انزل ببطء.'],
    mistakes: ['تقويس أسفل الظهر عند الرفع.', 'الدفع بأصابع القدم بدل الكعبين.'], breath: 'ازفر عند الرفع.',
    easier: 'قلل ارتفاع الرفع.', harder: 'جسر بساق واحدة.' },
  { name: 'Glute bridge', desc: 'An effective, safe exercise for the glutes.',
    steps: ['Lie on your back, knees bent, feet flat.', 'Lift your hips into a line from shoulder to knee.', 'Squeeze the glutes for a second, then lower slowly.'],
    mistakes: ['Arching the lower back at the top.', 'Pushing through toes instead of heels.'], breath: 'Exhale as you lift.',
    easier: 'Lift a little less.', harder: 'Single-leg bridge.' });

add('single-leg-bridge', 'glutes', 2, 'reps', 3, 8, 60, [], ['glutes', 'hamstrings'],
  { name: 'جسر بساق واحدة', desc: 'نسخة أصعب من جسر الأرداف، لكل ساق.',
    steps: ['ابدأ كجسر الأرداف وارفع ساقاً مفرودة.', 'ارفع الورك بالساق الأخرى مع إبقائه مستوياً.', 'انزل ببطء وبدّل الساق.'],
    mistakes: ['ميلان الورك للجانب.', 'التسرع.'], breath: 'ازفر عند الرفع.',
    easier: 'جسر الأرداف العادي.', harder: 'ثبّت 3 ثوانٍ في الأعلى.' },
  { name: 'Single-leg bridge', desc: 'A harder glute bridge, per leg.',
    steps: ['Start as a glute bridge and extend one leg.', 'Lift the hips with the other leg, keeping them level.', 'Lower slowly and switch legs.'],
    mistakes: ['Hips tilting sideways.', 'Rushing.'], breath: 'Exhale as you lift.',
    easier: 'Standard glute bridge.', harder: 'Hold 3 seconds at the top.' });

add('side-lying-leg-raise', 'glutes', 1, 'reps', 2, 12, 45, [], ['glutes', 'hips'],
  { name: 'رفع الساق الجانبي', desc: 'تمرين لطيف لعضلات الورك الجانبية، لكل جانب.',
    steps: ['استلقِ على جانبك وساقاك ممدودتان.', 'ارفع الساق العلوية قليلاً دون تحريك الورك.', 'انزل ببطء ثم بدّل الجانب.'],
    mistakes: ['تحريك الجذع.', 'رفع الساق عالياً بدفع الورك.'], breath: 'ازفر عند الرفع.',
    easier: 'ثنِ الساق السفلية للثبات.', harder: 'ثبّت ثانيتين في الأعلى.' },
  { name: 'Side-lying leg raise', desc: 'A gentle exercise for the outer hips, per side.',
    steps: ['Lie on your side with legs straight.', 'Lift the top leg slightly without moving the hips.', 'Lower slowly, then switch sides.'],
    mistakes: ['Rocking the torso.', 'Swinging the leg high by pushing the hip.'], breath: 'Exhale as you lift.',
    easier: 'Bend the bottom leg for stability.', harder: 'Hold 2 seconds at the top.' });

/* ---------- Full body ---------- */
add('inchworm', 'full', 2, 'reps', 2, 6, 60, ['wrist', 'shoulder', 'back'], ['fullBody', 'abs', 'shoulders', 'hamstrings'],
  { name: 'الدودة', desc: 'تمرين شامل يجمع الإطالة والقوة.',
    steps: ['قف وانحنِ للأمام ولامس الأرض بيديك (اثنِ الركبتين عند الحاجة).', 'امشِ بيديك للأمام حتى وضع الضغط.', 'امشِ بيديك للخلف نحو قدميك ثم قف.'],
    mistakes: ['هبوط الورك في وضع الضغط.', 'التسرع.'], breath: 'تنفس بانتظام.',
    easier: 'قلل المسافة التي تمشيها بيديك.', harder: 'أضف ضغطة واحدة في وضع الضغط.' },
  { name: 'Inchworm', desc: 'A full-body move combining stretch and strength.',
    steps: ['Stand, fold forward and touch the floor (bend knees if needed).', 'Walk your hands forward to a push-up position.', 'Walk your hands back toward your feet, then stand.'],
    mistakes: ['Sagging hips in the push-up position.', 'Rushing.'], breath: 'Breathe steadily.',
    easier: 'Walk your hands out a shorter distance.', harder: 'Add one push-up at the bottom.' });

/* ---------- Cardio ---------- */
add('shadow-boxing', 'cardio', 1, 'time', 2, 30, 30, ['shoulder'], ['heart', 'shoulders'],
  { name: 'الملاكمة الظلية', desc: 'كارديو خفيف بلا قفز.',
    steps: ['قف وقدماك متباعدتان قليلاً وركبتاك مرنتان.', 'وجّه لكمات خفيفة بالتناوب في الهواء.', 'حافظ على الحركة دون فرد المرفق بقوة.'],
    mistakes: ['فرد المرفق بعنف.', 'تصلّب القدمين.'], breath: 'ازفر مع كل لكمة.',
    easier: 'أبطئ الإيقاع.', harder: 'أضف تحريك القدمين.' },
  { name: 'Shadow boxing', desc: 'Light cardio with no jumping.',
    steps: ['Stand with feet slightly apart and knees soft.', 'Throw light alternating punches in the air.', 'Keep moving without snapping the elbow straight.'],
    mistakes: ['Snapping the elbow hard.', 'Stiff, planted feet.'], breath: 'Exhale with each punch.',
    easier: 'Slow the rhythm.', harder: 'Add footwork.' });

add('high-knees', 'cardio', 2, 'time', 2, 30, 30, ['knee'], ['heart', 'quads', 'hips'],
  { name: 'الركبتان العاليتان', desc: 'كارديو متوسط الشدة.',
    steps: ['قف باعتدال وارفع الركبتين بالتناوب إلى مستوى الورك.', 'حرّك ذراعيك بإيقاع طبيعي.', 'حافظ على جذع منتصب.'],
    mistakes: ['الانحناء للخلف.', 'الهبوط الثقيل على القدمين.'], breath: 'تنفس بإيقاع منتظم.',
    easier: 'امشِ في المكان مع رفع الركبتين.', harder: 'زد السرعة.',
    safety: 'فيه ارتجاج للمفاصل، توقف عند أي ألم.' },
  { name: 'High knees', desc: 'Moderate-intensity cardio.',
    steps: ['Stand tall and lift knees alternately to hip height.', 'Pump your arms naturally.', 'Keep your torso upright.'],
    mistakes: ['Leaning back.', 'Landing heavily.'], breath: 'Breathe at a steady rhythm.',
    easier: 'March in place with high knees.', harder: 'Increase the speed.',
    safety: 'This is impact work. Stop at any joint pain.' },
  { intense: true });

add('mountain-climber', 'cardio', 2, 'time', 2, 30, 30, ['wrist', 'shoulder'], ['heart', 'abs', 'shoulders'],
  { name: 'متسلق الجبال', desc: 'كارديو وتقوية للجذع في وضع الضغط.',
    steps: ['خذ وضع الضغط ويداك تحت الكتفين.', 'اسحب الركبتين نحو الصدر بالتناوب.', 'حافظ على استقامة الجسم.'],
    mistakes: ['رفع الورك عالياً.', 'التسرع على حساب الثبات.'], breath: 'تنفس بإيقاع منتظم.',
    easier: 'نفّذه ببطء مع لمس الأرض بالقدم.', harder: 'زد السرعة.' },
  { name: 'Mountain climber', desc: 'Cardio and trunk strength from a push-up position.',
    steps: ['Take push-up position, hands under shoulders.', 'Drive your knees toward your chest alternately.', 'Keep your body in a straight line.'],
    mistakes: ['Piking the hips up.', 'Rushing at the cost of stability.'], breath: 'Breathe at a steady rhythm.',
    easier: 'Go slowly, tapping the foot down.', harder: 'Increase the speed.' },
  { intense: true });

export const byId = (id) => EXERCISES.find((e) => e.id === id);
