import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { NotesRepository } from '../../repository/notes.repository';

export default async function notesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { company_id, participant_id } = req.query;
  const stringifyCompanyId = company_id.toString();
  const stringifyParticipantId = participant_id.toString();
  const updatedNote: string | null = req.body.note;

  try {
    const repo = container.resolve(NotesRepository);
    let getNoteInfo = await repo.getNoteByCompanyAndParticipantId(
      stringifyCompanyId,
      stringifyParticipantId
    );
    if (req.method === 'GET') {
      if (!getNoteInfo.data) {
        return res.status(200).json({ data: { note: '' } });
      }
      return res.status(200).json({ data: { note: getNoteInfo.data['note'] } });
    } else if (req.method === 'PUT') {
      if (!getNoteInfo.data) {
        const result = await repo.insertNote(
          stringifyCompanyId,
          stringifyParticipantId,
          updatedNote
        );
        return res.status(201).json({ data: { note: result.data['note'] } });
      }

      const result = await repo.updateNote(
        stringifyCompanyId,
        stringifyParticipantId,
        updatedNote
      );
      return res.status(201).json({ data: { note: result.data['note'] } });
    } else {
      return res.status(401).json({ message: 'Request not supported.' });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
