# Κώστας Γάλλος — Ιστοσελίδα

Επαγγελματική ιστοσελίδα για κηπουρική και συντήρηση κήπων.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Lucide React

## Ανάπτυξη

```bash
npm install
npm run dev
```

Άνοιγμα: [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Ρυθμίσεις

- Τηλέφωνο και κείμενα: `src/lib/constants.ts`
- URL ιστότοπου (SEO): μεταβλητή περιβάλλοντος `NEXT_PUBLIC_SITE_URL` (π.χ. `https://kostaskipoi.vercel.app`)
- Admin φωτογραφιών: δείτε παρακάτω

## Admin panel φωτογραφιών

Διαδρομή: [/admin](http://localhost:3000/admin)

1. Αντιγράψτε `.env.example` σε `.env.local`
2. Ορίστε `ADMIN_PASSWORD`
3. Τρέξτε `npm run dev` και συνδεθείτε στο `/admin`

Από το panel μπορείτε να:

- ανεβάσετε φωτογραφίες έργων
- επεξεργαστείτε alt κείμενο (EL/EN)
- αλλάξετε σειρά εμφάνισης
- διαγράψετε φωτογραφίες από τη συλλογή

Τοπικά οι νέες φωτογραφίες αποθηκεύονται στο `public/uploads/gallery` και το manifest στο `data/photos.json`.

Στο Vercel, για μόνιμα ανεβάσματα ορίστε και `BLOB_READ_WRITE_TOKEN` (Vercel Blob). Χωρίς αυτό η συλλογή διαβάζεται από το `data/photos.json`, αλλά τα νέα uploads δεν διατηρούνται.

## Vercel deploy

Το project είναι Next.js. Το `vercel.json` ορίζει ρητά `framework: nextjs`.

Αν βλέπετε Vercel 404 (`NOT_FOUND`) ενώ το domain δείχνει Valid Configuration:

1. **Vercel → Project → Settings → Deployment Protection**  
   Απενεργοποιήστε την προστασία για **Production** (ή κρατήστε την μόνο για Preview), ώστε η σελίδα να είναι δημόσια.
2. **Vercel → Deployments**  
   Ανοίξτε το τελευταίο Production deployment από `main` και κάντε **Redeploy** αν χρειάζεται.
3. **Vercel → Settings → General → Framework Preset**  
   Πρέπει να είναι **Next.js** (όχι Other).
4. **Root Directory**  
   Πρέπει να είναι `./` (root του repo).

## Σημειώσεις

- Η φόρμα επικοινωνίας είναι UI-ready και μπορεί να συνδεθεί αργότερα με email service.
- Η συλλογή έργων δείχνει πραγματικές φωτογραφίες εργασιών.
- Οι ατμοσφαιρικές εικόνες hero δεν παρουσιάζονται ως έργα του επαγγελματία.
